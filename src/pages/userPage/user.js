import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
// import { usePosition } from '../../Hook';
import styles from './style.module.css';
import { ReactComponent as PhotoIcon } from '../../assets/images/insert_photo-white-18dp.svg';
import { ReactComponent as CollectionIcon } from '../../assets/images/layers-white-18dp.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/favorite_border-white-18dp.svg';

function User(prop) {
  const match = useRouteMatch();
  const username = match.params.username;
  const data = useSelector((state) => state.unsplash.user);
  // usePosition();
  const user = useRef();
  const box = useRef();
  // const height = useRef();

  // useEffect(() => {
  //   const onScroll = () => {
  //     if (!height.current && height.current !== 0) {
  //       height.current = box.current.offsetHeight;
  //     }
  //     let newHeight = height.current - window.pageYOffset;
  //     newHeight = newHeight / height.current >= 0.5 ? newHeight : 0;
  //     box.current.style.height = `${newHeight}px`;
  //     box.current.style.transform = `scale(${
  //       newHeight / height.current
  //     })`;

  //   box.current.style.opacity = `${newHeight / height.current}`;
  // };
  // if (
  //   document.body.getBoundingClientRect().height -
  //     window.innerHeight <
  //   300
  // )
  //   return;
  // if (
  //   window.pageYOffset > 20 &&
  //   !user.current.className.includes(styles.sticky)
  // ) {
  //   user.current.classList.add(styles.sticky);
  //   box.current.classList.add(styles.close);

  // } else if (
  //   window.pageYOffset <= 20 &&
  //   user.current.className.includes(styles.sticky)
  // ) {
  //   user.current.classList.remove(styles.sticky);
  //   box.current.classList.remove(styles.close);

  // }
  //   };
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, []);

  return (
    <div className={styles.user} ref={user}>
      {!data ? null : (
        <>
          <div className={styles.box} ref={box}>
            <img src={data.profile_image.large} alt="profile" />
            <div className={styles.detail}>
              <p>{data.name}</p>
              <p>{data.bio}</p>
            </div>
          </div>
          <div className={styles.navlinks}>
            <NavLink
              to={`/users/${username}/photos`}
              activeClassName={styles.active}
            >
              <PhotoIcon />
              {data.total_photos}
            </NavLink>

            <NavLink
              to={`/users/${username}/collections`}
              activeClassName={styles.active}
            >
              <CollectionIcon />
              {data.total_collections}
            </NavLink>
            <NavLink
              to={`/users/${username}/likes`}
              activeClassName={styles.active}
            >
              <LikeIcon />
              {data.total_likes}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

export default User;
