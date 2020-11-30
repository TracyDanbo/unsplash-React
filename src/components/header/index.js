import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { useSticky } from '../../Hook';
import Search from '../searchBar';
import { TextButton } from '../materialButton';
import { ReactComponent as MenuIcon } from '../../assets/images/menu-black-18dp.svg';
import { ReactComponent as AccountIcon } from '../../assets/images/account_circle-white-18dp.svg';
import styles from './style.module.css';

function Header(props) {
  const { isLogin, avatar, children, className, style } = props;
  const container = useRef();
  const navlinks = useRef();
  // useSticky(
  //   () => {
  //     if (container.current.classList.contains(styles.open)) return;
  //     container.current.classList.add(styles.hide);
  //   },
  //   () => {
  //     if (container.current.classList.contains(styles.open)) return;
  //     container.current.classList.remove(styles.hide);
  //   },
  // );

  const onClickHandle = (event) => {
    const target = event.target;
    if (target === container.current) {
      target.classList.remove(styles.open);
      navlinks.current.classList.remove(styles.open);
      // userlinks.current.classList.remove(styles.open);
    }
    if (target.tagName.toLowerCase() === 'a') {
      target.parentNode.classList.remove(styles.open);
      container.current.classList.remove(styles.open);
    }
  };
  return (
    <header
      className={[styles.header, className].join(' ')}
      onClick={onClickHandle}
      ref={container}
      style={style}
    >
      <div className={styles.box}>
        <div className={styles.menu}>
          <TextButton
            aria-label="menu"
            color="rgb(0,0,0,0.2)"
            onClick={() => {
              navlinks.current.classList.toggle(styles.open);
              container.current.classList.toggle(styles.open);
            }}
          >
            <MenuIcon />
          </TextButton>
        </div>
        <div className={styles.navlinks} ref={navlinks}>
          <NavLink to="/" exact activeClassName={styles.active}>
            Home
          </NavLink>
          <NavLink to="/photos" activeClassName={styles.active}>
            Photo
          </NavLink>
          <NavLink to="/Collections" activeClassName={styles.active}>
            Collection
          </NavLink>
        </div>
        <Search className={styles.search} />
        <div className={styles.user}>
          <Link to={isLogin ? '/account/likes' : '/auth/login'}>
            <TextButton color="rgba(0,0,0,0.2)" aria-label="avatar">
              {!avatar ? (
                <AccountIcon />
              ) : (
                <img
                  className={styles.avatar}
                  src={avatar}
                  alt="avatar"
                />
              )}
            </TextButton>
          </Link>
        </div>
      </div>
      {children ? (
        <div className={styles.extend}>{children}</div>
      ) : null}
    </header>
  );
}

Header.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default React.memo(Header);
