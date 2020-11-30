import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MasonryLayout from '../../components/masonryLayouts';
import User from '../../components/user';
import { usePosition } from '../../Hook';
import * as actions from '../../actions';

function Users(props) {
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
      renderItem={(item) => <User data={item} />}
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
    data: state.unsplash.search_users,
    page: state.unsplash.search_users_page,
    hasMore: state.unsplash.search_users_hasMore,
    isLoaded: state.unsplash.loaded,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    fetchData: (query, page, perPage) =>
      dispatch(actions.searchUsers(query, page, perPage)),
  };
};

Users.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
  hasMore: PropTypes.bool,
  isLoaded: PropTypes.bool,
  fetchData: PropTypes.func,
};

export default connect(mapStateToProp, mapDispatchToProp)(Users);
