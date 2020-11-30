import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHeight } from '../../Hook';

import styles from './style.module.css';

function Collection(props) {
  const { data } = props;
  const height = useHeight({
    sourceHeight: data.cover_photo.height,
    sourceWidth: data.cover_photo.width,
  });

  const onLoadHandle = (event) => {
    event.target.classList.add(styles.load);
  };

  return (
    <div
      className={styles.container}
      style={{ minHeight: '200px', height }}
    >
      <div className={styles.header}>
        <p>{data.total_photos} Photos</p>
        <p>{data.title}</p>
      </div>
      <Link className={styles.cover} to={`/collection/${data.id}`}>
        {data.cover_photo ? (
          <img
            src={data.cover_photo.urls.small}
            alt="cover"
            onLoad={onLoadHandle}
          />
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </Link>
      <div className={styles.footer}>
        <div className={styles.user}>
          <Link
            className={styles.profile}
            to={`/users/${data.user.username}/photos`}
          >
            <img
              src={data.user.profile_image.medium}
              alt="profile"
              onLoad={(event) =>
                event.target.classList.toggle(styles.loaded)
              }
            />
          </Link>
          <Link
            className={styles.name}
            to={`/users/${data.user.username}/photos`}
          >
            <span>{data.user.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

Collection.propTypes = {
  data: PropTypes.object.isRequired,
};

export default React.memo(Collection);
