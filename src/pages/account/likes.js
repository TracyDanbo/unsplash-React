import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Photo from '../../components/photo';
import MasonryLayouts from '../../components/masonryLayouts';
import * as actions from '../../actions';

function Likes(props) {
  const {
    data,
    fetchData,
    hasMore,
    loaded,
    id,
    cursor,
    isLogin,
  } = props;
  useEffect(() => {
    if (id && data.length === 0 && hasMore) {
      fetchData(id, 0);
    }
  }, [fetchData, id, data, hasMore]);
  return (
    <MasonryLayouts
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(item, columns) => (
        <Photo data={item} columns={columns} isLogin={isLogin} />
      )}
      hasMore={hasMore}
      onEndReached={() => {
        if (hasMore && loaded) {
          fetchData(id, cursor + 1);
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.db.likes,
    hasMore: state.db.hasMore,
    loaded: state.db.loaded,
    id: state.auth.localId,
    cursor: state.db.cursor,
    isLogin: state.auth.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (id, cursor) => {
      dispatch(actions.getLikes(id, cursor));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
