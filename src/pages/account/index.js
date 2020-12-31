import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Likes from './likes';
import Setting from './setting';
import { ReactComponent as LikeIcon } from '../../assets/images/favorite_border-white-18dp.svg';
import { ReactComponent as SettingIcon } from '../../assets/images/settings-black-18dp.svg';
import styles from './style.module.css';

function Account(props) {
  const { t } = useTranslation('account');
  return (
    <>
      <div className={styles.tabBar}>
        <div className={styles.navlinks}>
          <NavLink
            to={`/account/likes`}
            activeClassName={styles.active}
          >
            <LikeIcon />
            {t('like')}
          </NavLink>
          <NavLink
            to={`/account/setting#profile`}
            activeClassName={styles.active}
          >
            <SettingIcon />
            {t('setting')}
          </NavLink>
        </div>
      </div>
      <Route path="/account/setting" component={Setting} />
      <Route path="/account/likes" component={Likes} />
    </>
  );
}

export default Account;
