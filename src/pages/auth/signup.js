import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { Link, useHistory } from 'react-router-dom';
import { OutlinedTextField } from '../../components/materialTextField';
import {
  TextButton,
  ContainedButton,
} from '../../components/materialButton';
import LoadingBar from '../../components/lodingBar';
import Alert from '../../components/alert';
import { TextSelect } from '../../components/materialTextField';
import { useTranslation } from 'react-i18next';
import * as actions from '../../actions';
import styles from './style.module.css';

function SignUp(props) {
  const { t, i18n } = useTranslation('auth');
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoging, setIsLoging] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const userRef = useRef();
  useEffect(() => {
    if (auth.signUp_error) {
      setIsLoging(false);
      setErrorMessage(auth.signUp_error);
    }
    if (isLoging) {
      setErrorMessage('');
    }
    if (auth.isLogin) {
      dispatch(actions.updatProfile(userRef.current.value));
      history.replace('/photos');
    }
  }, [auth, history, isLoging, dispatch]);
  const submitHandle = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;

    if (!validator.equals(password, confirm)) {
      setErrorMessage(t('nocomfirm'));
      return;
    }
    if (!validator.isEmail(email)) {
      setErrorMessage(t('invalidemail'));
      return;
    }
    if (!validator.isLength(password, { min: 8 })) {
      setErrorMessage(t('atleast'));
      return;
    }
    if (validator.isVariableWidth(password)) {
      setErrorMessage(t('halfwidth'));
      return;
    }
    if (validator.isNumeric(password)) {
      setErrorMessage(t('helperText'));
      return;
    }
    if (!validator.matches(password, '[0-9]')) {
      setErrorMessage(t('helperText'));
      return;
    }
    if (!validator.isAscii(password)) {
      setErrorMessage(t('ascii'));
      return;
    }
    setIsLoging(true);
    dispatch(actions.signUp(email, password));
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
      <div className={styles.signup}>
        {isLoging ? <LoadingBar /> : null}
        <div className={styles.header}>
          <h1>{t('signheader')}</h1>
        </div>
        {errorMessage ? <Alert text={errorMessage} /> : null}
        <form onSubmit={submitHandle} className={styles.form}>
          <OutlinedTextField
            ref={userRef}
            type="text"
            label={t('name')}
            color="orange"
            className={styles.input}
            autoFocus
          />
          <OutlinedTextField
            ref={emailRef}
            type="email"
            label={t('email')}
            color="orange"
            className={styles.input}
          />
          <OutlinedTextField
            ref={passwordRef}
            type="password"
            label={t('password')}
            color="orange"
            className={styles.input}
            helperText={t('helperText')}
          />
          <OutlinedTextField
            ref={confirmRef}
            type="password"
            label={t('comfirm')}
            color="orange"
            className={styles.input}
          />
          <div className={styles.box}>
            <Link to="/auth/login" className={styles.redirect}>
              <TextButton
                color="#0a6eef"
                type="button"
                ripple={false}
              >
                {t('loginInstead')}
              </TextButton>
            </Link>
            <ContainedButton color="#0a6eef" text={t('sign')} />
          </div>
        </form>
      </div>

      <TextSelect
        options={['中文']}
        defaultValue="English"
        label="Language"
        className={styles.language}
        onChange={onChanegLanguage}
      />
    </>
  );
}

export default SignUp;
