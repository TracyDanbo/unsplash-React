import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('account');
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
      <h1>{t('change')}</h1>
      {errorMessage ? <Alert text={errorMessage} /> : null}
      {!changingPassword && !passwordHash ? (
        <div
          className={[styles.container, styles.security].join(' ')}
        >
          <StandardTextField
            type="password"
            label={t('current')}
            color="blue"
            ref={currentRef}
          />
          <StandardTextField
            ref={newRef}
            type="password"
            label={t('new')}
            color="blue"
            helperText={t('helperText')}
          />
          <StandardTextField
            type="password"
            label={t('comfirm')}
            color="blue"
            ref={confirmRef}
          />
          <div className={styles.commit}>
            <ContainedButton
              text={t('change')}
              color="blue"
              onClick={onChangePassword}
            />
          </div>
        </div>
      ) : changingPassword && !passwordHash ? (
        <div className={styles.waiting}>
          <p>{t('updating')}</p>
          <LoadingDot size={32} />
        </div>
      ) : (
        <div className={styles.waiting}>
          <p>{t('updated')}</p>
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
