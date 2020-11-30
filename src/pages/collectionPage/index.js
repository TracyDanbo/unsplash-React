import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import Photos from './photos';
import { ReactComponent as PhotoIcon } from '../../assets/images/insert_photo-white-18dp.svg';
import * as actions from '../../actions';
import styles from './style.module.css';

function CollectionPage(props) {
  const {
    params: { collectionId },
  } = useRouteMatch();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.unsplash.collection);
  useEffect(() => {
    dispatch(actions.clearCollection());
    dispatch(actions.getCollection(collectionId));
    dispatch(actions.getCollectionPhotos(collectionId, 1, 15));
  }, [dispatch, collectionId]);

  let content = <div className={styles.collection}></div>;
  if (data) {
    content = (
      <div
        className={styles.collection}
        style={{
          backgroundImage: `url(${data.cover_photo.urls.regular})`,
        }}
      >
        <div className={styles.container}>
          <div className={styles.detail}>
            <p>{data.title}</p>
            {data.description ? <p>{data.description}</p> : null}
            <p>
              <PhotoIcon />
              <span>{data.total_photos}</span>
            </p>
          </div>
          <div className={styles.user}>
            <Link to={`/users/${data.user.username}/photos`}>
              <img
                src={data.user.profile_image.medium}
                alt="user profile"
              />
            </Link>
            <Link to={`/users/${data.user.username}/photos`}>
              <span>{data.user.name}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.collectionPage}>
      {content}
      <Photos id={collectionId} />
    </div>
  );
}

export default CollectionPage;
