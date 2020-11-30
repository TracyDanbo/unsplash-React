import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as actions from '../../actions';
import { OutlinedButton } from '../../components/materialButton';
import { ReactComponent as LikeIcon } from '../../assets/images/favorite_border-white-18dp.svg';
import { ReactComponent as SettingIcon } from '../../assets/images/settings-black-18dp.svg';
import profile_default from '../../assets/images/Profile-PNG-Images.png';
import styles from './style.module.css';

function User(props) {
  // const user = useRef();
  // const box = useRef();
  // const auth = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const onLogOut = () => {
  //   dispatch(actions.logOut());
  //   history.replace('/photos');
  // };
  // useEffect(() => {
  //   const onScroll = () => {
  //     if (
  //       document.body.getBoundingClientRect().height -
  //         window.innerHeight <
  //       300
  //     )
  //       return;
  //     if (window.pageYOffset > 20) {
  //       user.current.classList.add(styles.sticky);
  //       box.current.classList.add(styles.close);
  //     } else {
  //       user.current.classList.remove(styles.sticky);
  //       box.current.classList.remove(styles.close);
  //     }
  //   };
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, []);
  return (
    <div className={styles.user}>
      {/* <div className={styles.box} ref={box}>
        <img
          src={
            auth.profile_image ? auth.profile_image : profile_default
          }
          alt="profile"
        />
        <div className={styles.detail}>
          <p>{auth.displayName}</p>
          <OutlinedButton
            text="LogOut"
            onClick={onLogOut}
            color="blue"
          />
        </div>
      </div> */}
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
