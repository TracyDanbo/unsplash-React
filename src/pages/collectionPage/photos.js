import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MasonryLayouts from '../../components/masonryLayouts';
import Photo from '../../components/photo';
import * as actions from '../../actions';

function Photos(props) {
  const {
    data,
    fetchData,
    isLoaded,
    hasMore,
    page,
    id,
    isLogin,
  } = props;
  return (
    <MasonryLayouts
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <Photo data={item} isLogin={isLogin} />}
      onEndReached={() => {
        if (isLoaded && hasMore) {
          fetchData(id, page + 1, 15);
        }
      }}
      hasMore={hasMore}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.unsplash.collection_photos,
    page: state.unsplash.collection_photos_page,
    hasMore: state.unsplash.collection_photos_hasMore,
    isLoaded: state.unsplash.loaded,
    isLogin: state.auth.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (id, page, perPage) => {
      dispatch(actions.getCollectionPhotos(id, page, perPage));
    },
  };
};

Photos.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchData: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
