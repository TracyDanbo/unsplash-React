import React from 'react';
import { Route } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
import Reset from './reset';
import styles from './style.module.css';

function Auth(props) {
  return (
    <div
      className={styles.auth}
      style={{
        minHeight: `${document.documentElement.clientHeight}px`,
      }}
    >
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/reset" component={Reset} />
    </div>
  );
}

export default Auth;
