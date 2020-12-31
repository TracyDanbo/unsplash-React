import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  OutlinedTextField,
  TextSelect,
} from '../../components/materialTextField';
import { ContainedButton } from '../../components/materialButton';
import Alert from '../../components/alert';
import { useTranslation } from 'react-i18next';
import * as actions from '../../actions';
import styles from './style.module.css';

function Reset(props) {
  const { t, i18n } = useTranslation('auth');
  const dispatch = useDispatch();
  const history = useHistory();
  const [toRest, setToRest] = useState(false);
  const emailRef = useRef();
  const submitHandle = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    dispatch(actions.resetPassword(email));
    setToRest(true);
    setTimeout(() => {
      history.replace('/auth/login');
    }, 5000);
  };
  const onChanegLanguage = (language) => {
    if (Object.values(language)[0] === 'English') {
      i18n.changeLanguage('en');
      localStorage.setItem('language', 'en');
    } else {
      i18n.changeLanguage('cn');
      localStorage.setItem('language', 'cn');
    }
  };
  console.log(i18n.getDataByLanguage('cn'));
  return (
    <>
      <div className={styles.reset}>
        <div className={styles.header}>
          <h1>{t('reseth1')}</h1>
          <h2>{t('reseth2')}</h2>
        </div>
        {toRest ? (
          <Alert color="#ff9f68" text={t('resetText')} />
        ) : null}
        <form onSubmit={submitHandle} className={styles.form}>
          <OutlinedTextField
            ref={emailRef}
            type="email"
            label={t('email')}
            color="orange"
            autoFocus
          />
          <div className={styles.box}>
            <ContainedButton color="#0a6eef" text={t('reset')} />
          </div>
        </form>
      </div>
      <TextSelect
        options={['中文']}
        defaultValue="English"
        label={t('language')}
        value={t('currentLanguage')}
        className={styles.language}
        onChange={onChanegLanguage}
      />
    </>
  );
}

export default Reset;
