import React, { useEffect, Suspense } from 'react';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Photos from './photos';
// import Collections from './collections';
// import Likes from './likes';
import MaterialSpinner from '../../components/materialSpinner';
import { ReactComponent as PhotoIcon } from '../../assets/images/insert_photo-white-18dp.svg';
import { ReactComponent as CollectionIcon } from '../../assets/images/layers-white-18dp.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/favorite_border-white-18dp.svg';

import * as actions from '../../actions';
import styles from './style.module.css';

const Collections = React.lazy(() => import('./collections'));
const Likes = React.lazy(() => import('./likes'));
function UserPage(props) {
  const data = useSelector((state) => state.unsplash.user);
  const dispatch = useDispatch();
  const {
    params: { username },
  } = useRouteMatch();
  useEffect(() => {
    dispatch(actions.clearUser());
    dispatch(actions.getUser(username));
    dispatch(actions.getUserPhotos(username, 1, 15));
    dispatch(actions.getUserCollections(username, 1, 15));
    dispatch(actions.getUserLikes(username, 1, 15));
  }, [dispatch, username]);
  return (
    <Suspense fallback={<MaterialSpinner color="orange" />}>
      <div className={styles.userPage}>
        {/* <User /> */}
        {!data ? (
          <div className={styles.box}></div>
        ) : (
          <>
            <div className={styles.box}>
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
        <Route path="/users/:username/photos" component={Photos} />
        <Route
          path="/users/:username/collections"
          component={Collections}
        />
        <Route path="/users/:username/likes" component={Likes} />
      </div>
    </Suspense>
  );
}

export default UserPage;
