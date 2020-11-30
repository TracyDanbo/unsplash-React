import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryLayout from '../../components/masonryLayouts';
import Collection from '../../components/collection';
import { usePosition } from '../../Hook';
import * as actions from '../../actions';

function Collections(props) {
  const { data, fetchData, page, isLoaded, hasMore } = props;
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
        renderItem={(item) => <Collection data={item} />}
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
    data: state.unsplash.collections,
    page: state.unsplash.collections_page,
    hasMore: state.unsplash.collections_hasMore,
    isLoaded: state.unsplash.loaded,
    avatar: state.auth.profilePicture,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchData: (page, perPage) =>
      dispatch(actions.listCollections(page, perPage)),
  };
};

Collections.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Collections);
