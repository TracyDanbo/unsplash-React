import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CollectionIcon } from '../../assets/images/layers-white-18dp.svg';
import { ReactComponent as LikeIcon } from '../../assets/images/favorite_border-white-18dp.svg';
import { ReactComponent as PhotoIcon } from '../../assets/images/insert_photo-white-18dp.svg';
import styles from './style.module.css';

function User(props) {
  const { data } = props;
  return (
    <Link
      to={`/users/${data.username}/photos`}
      className={styles.user}
    >
      <img src={data.profile_image.large} alt="profile" />
      <div className={styles.profile}>
        <div className={styles.name}>
          <p>{data.name}</p>
        </div>
        <div className={styles.assets}>
          <div className={styles.item}>
            <PhotoIcon />
            <span>{data.total_photos}</span>
          </div>
          <div className={styles.item}>
            <CollectionIcon />
            <span>{data.total_collections}</span>
          </div>
          <div className={styles.item}>
            <LikeIcon />
            <span>{data.total_likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

User.propType = {
  data: PropTypes.object,
};

export default User;
