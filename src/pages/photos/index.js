import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryLayout from '../../components/masonryLayouts';
import Photo from '../../components/photo';
import * as actions from '../../actions';
import { usePosition } from '../../Hook';

function Photos(props) {
  const { data, fetchData, page, isLoaded, hasMore, isLogin } = props;
  useEffect(() => {
    if (data.length) return;
    fetchData(1, 10);
  }, [fetchData, data]);
  usePosition();

  return (
    <div style={{ marginTop: '9rem' }}>
      <MasonryLayout
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <Photo data={item} isLogin={isLogin} />}
        onEndReached={() => {
          if (isLoaded && hasMore) {
            fetchData(page + 1, 10);
          }
        }}
        hasMore={hasMore}
      />
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    data: state.unsplash.photos,
    page: state.unsplash.photos_page,
    hasMore: state.unsplash.photos_hasMore,
    isLoaded: state.unsplash.loaded,
    isLogin: state.auth.isLogin,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchData: (page, perPage) =>
      dispatch(actions.listPhotos(page, perPage)),
  };
};

Photos.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

export default connect(mapStateToProp, mapDispatchToProp)(Photos);
