import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as LikeIcon } from '../../assets/images/favorite_border-white-18dp.svg';
import { ReactComponent as SettingIcon } from '../../assets/images/settings-black-18dp.svg';
import styles from './style.module.css';

function User(props) {
  return (
    <div className={styles.user}>
      <div className={styles.navlinks}>
        <NavLink
          to={`/account/likes`}
          activeClassName={styles.active}
        >
          <LikeIcon />
          Likes
        </NavLink>
        <NavLink
          to={`/account/setting#profile`}
          activeClassName={styles.active}
        >
          <SettingIcon />
          Setting
        </NavLink>
      </div>
    </div>
  );
}

export default User;
