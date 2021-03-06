import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavHashLink } from 'react-router-hash-link';
import { TextButton } from '../../components/materialButton';
import { ReactComponent as SecurityIcon } from '../../assets/images/https-black-18dp.svg';
import { ReactComponent as ProfileIcon } from '../../assets/images/assignment_ind-black-18dp.svg';
import { ReactComponent as ExitIcon } from '../../assets/images/exit_to_app-black-18dp.svg';
import styles from './style.module.css';
function SideBar(props) {
  const { logout } = props;
  const { t } = useTranslation('account');
  return (
    <div className={styles.sideBar}>
      <NavHashLink
        onClick={(e) => {
          e.preventDefault();
        }}
        smooth
        exact
        to="/account/setting#profile"
        scroll={(el) =>
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
        }
        activeClassName={styles.active}
        isActive={(match, location) => {
          if (match && location.hash === '#profile') {
            return true;
          }
        }}
      >
        <TextButton color="blue">
          <ProfileIcon />
          {t('profile')}
        </TextButton>
      </NavHashLink>

      <NavHashLink
        onClick={(e) => {
          e.preventDefault();
        }}
        smooth
        exact
        to="/account/setting#security"
        activeClassName={styles.active}
        isActive={(match, location) => {
          if (match && location.hash === '#security') {
            return true;
          }
        }}
      >
        <TextButton color="blue">
          <SecurityIcon />
          {t('change')}
        </TextButton>
      </NavHashLink>
      <Link to="/photos" onClick={logout}>
        <TextButton color="blue" ripple={false}>
          <ExitIcon />
          {t('logout')}
        </TextButton>
      </Link>
    </div>
  );
}

export default SideBar;
