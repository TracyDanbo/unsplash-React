import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextSelect } from '../../components/materialTextField';
import { ReactComponent as CancelIcon } from '../../assets/images/clear-white-18dp.svg';
import { ReactComponent as DoneIcon } from '../../assets/images/done-black-18dp.svg';
import { ReactComponent as EditIcon } from '../../assets/images/create-black-18dp.svg';
import { ReactComponent as CameraIcon } from '../../assets/images/camera_alt-white-18dp.svg';
import defaultPhoto from '../../assets/images/Profile-PNG-Images.png';
import styles from './style.module.css';
function Profile(props) {
  const {
    auth,
    onChangeName,
    name,
    onUpdateProfile,
    onCancelUpdateProfile,
    openUploadPanel,
  } = props;
  const { t, i18n } = useTranslation(['auth', 'account']);
  const onChanegLanguage = (language) => {
    if (Object.values(language)[0] === 'English') {
      i18n.changeLanguage('en');
      localStorage.setItem('language', 'en');
    } else {
      i18n.changeLanguage('cn');
      localStorage.setItem('language', 'cn');
    }
  };
  const editRef = useRef();
  const onEdit = (e) => {
    editRef.current.classList.add(styles.open);
    editRef.current.focus();
  };
  const onCancelUpdate = () => {
    onCancelUpdateProfile();
    editRef.current.classList.remove(styles.open);
    editRef.current.blur();
  };
  const UpdateProfile = () => {
    onUpdateProfile();
    editRef.current.classList.remove(styles.open);
    editRef.current.blur();
  };
  return (
    <div
      id="profile"
      className={[styles.snippet, styles.profile].join(' ')}
    >
      <h1>{t('account:profile')}</h1>
      <div className={[styles.container, styles.profile].join(' ')}>
        <div className={styles.row} onClick={openUploadPanel}>
          <CameraIcon />
          <img
            className={styles.avatar}
            src={auth.photoUrl ? auth.photoUrl : defaultPhoto}
            alt="profile"
          />
        </div>
        <div className={styles.row}>
          <span className={styles.filed}>{t('email')}:</span>
          <span className={styles.value}>{auth.email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.filed}>{t('name')}:</span>
          <div className={styles.edit}>
            <EditIcon onClick={onEdit} />
          </div>
          <span className={styles.value}>
            {name ? name : auth.displayName}
          </span>
          <label className={styles.editfiled} ref={editRef}>
            <input
              type="text"
              value={name}
              onChange={onChangeName}
              placeholder={t('account:edit')}
            />

            <div className={styles.done}>
              <DoneIcon onClick={UpdateProfile} />
            </div>
            <div className={styles.cancel}>
              <CancelIcon onClick={onCancelUpdate} />
            </div>
          </label>
        </div>
        <div className={styles.row}>
          <span className={styles.filed}>{t('language')}:</span>
          <TextSelect
            labelText="language"
            options={['中文']}
            defaultValue="English"
            value={t('currentLanguage')}
            className={styles.language}
            onChange={onChanegLanguage}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
