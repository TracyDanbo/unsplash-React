import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';
import {
  TextButton,
  ContainedButton,
} from '../../components/materialButton';
import { OutlinedTextField } from '../../components/materialTextField';

import { TextSelect } from '../../components/materialTextField';
import LoadingBar from '../../components/lodingBar';
import Alert from '../../components/alert';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';

function Login(props) {
  const { t, i18n } = useTranslation('auth');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoging, setIsLoging] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const emailRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    if (auth.isLogin) {
      history.replace('/photos');
    }
    if (auth.login_error) {
      setIsLoging(false);
      setErrorMessage(auth.login_error);
      emailRef.current.removeAttribute('disabled');
      passwordRef.current.removeAttribute('disabled');
    }
    if (isLoging) {
      setErrorMessage('');
    }
  }, [auth, history, isLoging]);
  const submitHandle = (event) => {
    event.preventDefault();
    dispatch(actions.clearError());
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    emailRef.current.setAttribute('disabled', true);
    passwordRef.current.setAttribute('disabled', true);
    if (validator.isEmail(email) && password) {
      setIsLoging(true);
      dispatch(actions.login(email, password));
    } else {
      setErrorMessage(t('invalidemail'));
      emailRef.current.removeAttribute('disabled');
      passwordRef.current.removeAttribute('disabled');
    }
  };
  const onChanegLanguage = ({ language }) => {
    if (language === 'English') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('cn');
    }
  };
  return (
    <>
      <div className={styles.login}>
        {isLoging ? (
          <LoadingBar className={styles.loadingBar} />
        ) : null}
        <div className={styles.header}>
          <h1>{t('loginheader')}</h1>
          <h2>{t('useaccount')}</h2>
        </div>
        {errorMessage ? <Alert text={errorMessage} /> : null}
        <form onSubmit={submitHandle} className={styles.form}>
          <OutlinedTextField
            ref={emailRef}
            color="orange"
            type="email"
            label={t('email')}
            className={styles.input}
            autoFocus
          />
          <OutlinedTextField
            ref={passwordRef}
            color="orange"
            type="password"
            label={t('password')}
            className={styles.input}
          />

          <Link to="/auth/reset" className={styles.redirect}>
            <TextButton color="#0a6eef" type="button" ripple={false}>
              {t('forgot')}
            </TextButton>
          </Link>
          <div className={styles.box}>
            <Link to="/auth/signup" className={styles.redirect}>
              <TextButton
                color="#0a6eef"
                type="button"
                ripple={false}
              >
                {t('create')}
              </TextButton>
            </Link>
            <ContainedButton text={t('login')} color="#0a6eef" />
          </div>
        </form>
      </div>

      <TextSelect
        label="Language"
        options={['中文']}
        defaultValue="English"
        className={styles.language}
        onChange={onChanegLanguage}
      />
    </>
  );
}

export default Login;
