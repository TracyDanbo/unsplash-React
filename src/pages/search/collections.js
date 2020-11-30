import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryLayout from '../../components/masonryLayouts';
import Collection from '../../components/collection';
import { usePosition } from '../../Hook';
import * as actions from '../../actions';

function Collections(props) {
  const {
    data,
    fetchData,
    page,
    isLoaded,
    hasMore,
    className,
  } = props;
  const {
    params: { query },
  } = useRouteMatch();
  usePosition();

  return (
    <MasonryLayout
      className={className}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <Collection data={item} />}
      onEndReached={() => {
        if (isLoaded && hasMore) {
          fetchData(query, page + 1, 10);
        }
      }}
      hasMore={hasMore}
    />
  );
}

const mapStateToProp = (state) => {
  return {
    data: state.unsplash.search_collections,
    page: state.unsplash.search_collections_page,
    hasMore: state.unsplash.search_collections_hasMore,
    isLoaded: state.unsplash.loaded,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchData: (query, page, perPage) =>
      dispatch(actions.searchCollections(query, page, perPage)),
  };
};

Collections.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default connect(
  mapStateToProp,
  mapDispatchToProp,
)(Collections);
