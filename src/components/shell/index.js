import React, { useEffect, Suspense } from 'react';
import LoadingDot from '../loadingDot';
import Header from '../header';
import i18n from '../../i18n';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

const Fallback = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <LoadingDot />
      </div>
    </div>
  );
};

function Shell(props) {
  const { avatar, isLogin, children, hotLogin } = props;
  useEffect(() => {
    hotLogin();
  }, [hotLogin]);
  return (
    <Suspense fallback={<Fallback />}>
      <Header avatar={avatar} isLogin={isLogin} />
      {children}
    </Suspense>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    avatar: state.auth.profilePicture,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hotLogin: () => {
      dispatch(actions.hotLogin());
    },
  };
};
Shell.propTypes = {
  avatar: PropTypes.string,
  children: PropTypes.node,
  header: PropTypes.node,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
