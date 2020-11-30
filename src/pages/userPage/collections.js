import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryLayout from '../../components/masonryLayouts';
import Collection from '../../components/collection';
import { usePosition } from '../../Hook';
import * as actions from '../../actions';

function Collections(props) {
  const { data, fetchData, page, isLoaded, hasMore } = props;
  const {
    params: { username },
  } = useRouteMatch();
  usePosition();
  return (
    <MasonryLayout
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <Collection data={item} />}
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
    data: state.unsplash.user_collections,
    page: state.unsplash.user_collections_page,
    hasMore: state.unsplash.user_collections_hasMore,
    isLoaded: state.unsplash.loaded,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchData: (username, page, perPage) =>
      dispatch(actions.getUserCollections(username, page, perPage)),
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
