import React, { useState, useRef, useEffect } from 'react';
import validator from 'validator';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContainedButton } from '../../components/materialButton';
import SideBar from './sidebar';
import Security from './security';
import Profile from './profile';
import Upload from './upload';
import * as actions from '../../actions';
import styles from './style.module.css';

function Setting(props) {
  const { t } = useTranslation('account');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const currentRef = useRef();
  const newRef = useRef();
  const confirmRef = useRef();
  const auth = useSelector((state) => ({
    displayName: state.auth.displayName,
    email: state.auth.email,
    photoUrl: state.auth.profilePicture,
    changingPassword: state.auth.changingPassword,
    change_password_error: state.auth.change_password_error,
    passwordHash: state.auth.passwordHash,
  }));
  const deletehash = useSelector((state) => state.imgur.deletehash);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.change_password_error) {
      setErrorMessage(auth.change_password_error);
    }
    return () => {
      if (auth.passwordHash) {
        dispatch(actions.authCleanHash());
      }
      if (deletehash) {
        dispatch(actions.imgurDoClean());
      }
    };
  }, [auth, dispatch, deletehash]);

  const onChangePassword = (event) => {
    const current = currentRef.current.value;
    const newPassword = newRef.current.value;
    const confirm = confirmRef.current.value;

    setErrorMessage('');
    if (validator.equals(current, newPassword)) {
      // setErrorMessage(
      //   'the new password and the current password could not be the same',
      // );
      setErrorMessage(t('nocomfirm'));
      return;
    }
    if (!validator.equals(newPassword, confirm)) {
      // setErrorMessage('Please confirm your password!');
      setErrorMessage(t('nocomfirm'));
      return;
    }

    if (!validator.isLength(newPassword, { min: 8 })) {
      // setErrorMessage('password should be  at least 8 characters');
      setErrorMessage(t('atleast'));
      return;
    }
    if (validator.isVariableWidth(newPassword)) {
      // setErrorMessage(
      //   'password should be only contain half-width characters',
      // );
      setErrorMessage(t('halfwidth'));
      return;
    }
    if (validator.isNumeric(newPassword)) {
      // setErrorMessage(
      //   'Use 8 or more characters with a mix of letters, numbers & symbols',
      // );
      setErrorMessage(t('helperText'));
      return;
    }
    if (!validator.matches(newPassword, '[0-9]')) {
      // setErrorMessage(
      //   'Use 8 or more characters with a mix of letters, numbers & symbols',
      // );
      setErrorMessage(t('helperText'));
      return;
    }
    if (!validator.isAscii(newPassword)) {
      // setErrorMessage(
      //   'the password can only contain Ascii characters',
      // );
      setErrorMessage(t('ascii'));
      return;
    }

    dispatch(
      actions.changePassword(auth.email, current, newPassword),
    );
  };

  const onUpdateProfile = () => {
    dispatch(actions.updatProfile(name));
  };
  const onCancelUpdateProfile = () => {
    setName('');
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onLogout = () => {
    dispatch(actions.logOut());
  };
  const openUploadPanel = () => {
    setIsOpen(true);
  };

  const uploadImage = (dataUrl) => {
    dispatch(actions.uploadImage(dataUrl));
  };

  const cleanImgur = () => {
    dispatch(actions.imgurDoClean());
  };

  const cleanHash = () => {
    dispatch(actions.authCleanHash());
  };

  return (
    <div className={styles.setting}>
      <SideBar logout={onLogout} />
      <div className={styles.details}>
        <Profile
          onChangeName={onChangeName}
          onUpdateProfile={onUpdateProfile}
          onCancelUpdateProfile={onCancelUpdateProfile}
          openUploadPanel={openUploadPanel}
          name={name}
          auth={auth}
        />
        <Security
          onChangePassword={onChangePassword}
          currentRef={currentRef}
          newRef={newRef}
          confirmRef={confirmRef}
          errorMessage={errorMessage}
          changingPassword={auth.changingPassword}
          passwordHash={auth.passwordHash}
          cleanHash={cleanHash}
        />
        <div className={styles.logOut}>
          <Link to="/photos" onClick={onLogout}>
            <ContainedButton color="blue" ripple={false}>
              {t('logout')}
            </ContainedButton>
          </Link>
        </div>
      </div>
      {isOpen ? (
        <Upload
          setIsOpen={setIsOpen}
          uploadImage={uploadImage}
          deletehash={deletehash}
          cleanImgur={cleanImgur}
        />
      ) : null}
    </div>
  );
}

export default Setting;
