import React, { useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import LoadingDot from '../../components/loadingDot';
import { StandardTextField } from '../../components/materialTextField';
import { ContainedButton } from '../../components/materialButton';
import { useObserver } from '../../Hook';
import Alert from '../../components/alert';

import styles from './style.module.css';

function Security(props) {
  const {
    onChangePassword,
    currentRef,
    newRef,
    confirmRef,
    errorMessage,
    changingPassword,
    passwordHash,
    cleanHash,
  } = props;
  const blockRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const callback = (entry, ob) => {
    if (entry.isIntersecting) {
      if (location.hash !== '#security') {
        history.replace('/account/setting#security');
      }
    } else {
      if (location.hash !== '#profile') {
        history.replace('/account/setting#profile');
      }
    }
  };
  const observer = useObserver(callback, { threshold: 1 });
  useEffect(() => {
    observer.observe(blockRef.current);
    return () => {
      observer.disconnect();
    };
  });
  return (
    <div id="security" className={styles.snippet} ref={blockRef}>
      <h1>Change Password</h1>
      {errorMessage ? <Alert text={errorMessage} /> : null}
      {!changingPassword && !passwordHash ? (
        <div
          className={[styles.container, styles.security].join(' ')}
        >
          <StandardTextField
            type="password"
            label="Current Password"
            color="blue"
            ref={currentRef}
          />
          <StandardTextField
            ref={newRef}
            type="password"
            label="New Password"
            color="blue"
            helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
          />
          <StandardTextField
            type="password"
            label="Comfirm Password"
            color="blue"
            ref={confirmRef}
          />
          <div className={styles.commit}>
            <ContainedButton
              text="Change Password"
              color="blue"
              onClick={onChangePassword}
            />
          </div>
        </div>
      ) : changingPassword && !passwordHash ? (
        <div className={styles.waiting}>
          <p>Changing Password...</p>
          <LoadingDot size={32} />
        </div>
      ) : (
        <div className={styles.waiting}>
          <p>Password has updated!</p>
          <ContainedButton
            text="Confirm"
            color="blue"
            onClick={cleanHash}
          />
        </div>
      )}
    </div>
  );
}

export default Security;
