import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryLayout from '../../components/masonryLayouts';
import Photo from '../../components/photo';
import { usePosition } from '../../Hook';
import * as actions from '../../actions';

function Photos(props) {
  const { data, fetchData, page, isLoaded, hasMore, isLogin } = props;
  const {
    params: { username },
  } = useRouteMatch();
  usePosition();

  return (
    <MasonryLayout
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(item, columns) => (
        <Photo data={item} columns={columns} isLogin={isLogin} />
      )}
      onEndReached={() => {
        if (isLoaded && hasMore) {
          fetchData(username, page + 1, 10);
        }
      }}
      hasMore={hasMore}
    />
  );
}

const mapStateToProp = (state) => {
  return {
    data: state.unsplash.user_photos,
    page: state.unsplash.user_photos_page,
    hasMore: state.unsplash.user_photos_hasMore,
    isLoaded: state.unsplash.loaded,
    isLogin: state.auth.isLogin,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchData: (username, page, perPage) =>
      dispatch(actions.getUserPhotos(username, page, perPage)),
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
