import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryLayout from '../../components/masonryLayouts';
import Photo from '../../components/photo';
import { usePosition } from '../../Hook';
import * as actions from '../../actions';

function Photos(props) {
  const {
    data,
    filter,
    fetchData,
    page,
    isLoaded,
    hasMore,
    className,
    isLogin,
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
      renderItem={(item) => <Photo data={item} isLogin={isLogin} />}
      onEndReached={() => {
        if (isLoaded && hasMore) {
          fetchData(query, page + 1, 15, filter);
        }
      }}
      hasMore={hasMore}
      threshold={0.5}
    />
  );
}

const mapStateToProp = (state) => {
  return {
    data: state.unsplash.search_photos,
    page: state.unsplash.search_photos_page,
    hasMore: state.unsplash.search_photos_hasMore,
    isLoaded: state.unsplash.loaded,
    isLogin: state.auth.isLogin,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchData: (query, page, perPage, filter) =>
      dispatch(actions.searchPhotos(query, page, perPage, filter)),
  };
};

Photos.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  filter: PropTypes.object,
  className: PropTypes.string,
};

export default connect(mapStateToProp, mapDispatchToProp)(Photos);
