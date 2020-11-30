import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import MaterialSpinner from '../materialSpinner';
import { useHeight } from '../../Hook';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { ReactComponent as HeartIcon } from '../../assets/images/favorite_border-white-18dp.svg';
import { ReactComponent as DownloadIcon } from '../../assets/images/get_app-white-18dp.svg';
function Photo(props) {
  const { data, isLogin } = props;
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const [isDownload, setIsDownload] = useState(false);
  const height = useHeight({
    sourceWidth: data.width,
    sourceHeight: data.height,
  });

  const onLikeHandle = (event) => {
    if (!isLogin) {
      history.push('/auth/login');
      return;
    }
    if (data.liked_by_user) {
      dispatch(actions.removeLike(data.id));
    } else {
      const payload = {
        ...data,
        liked_by_user: true,
        add_at_time: new Date().getTime(),
      };
      dispatch(actions.addLike(data.id, payload));
    }

    event.currentTarget.classList.toggle(styles.click);
  };

  const downloadHandle = async (event) => {
    const a = event.currentTarget;
    if (a.href.startsWith('blob')) return;
    event.preventDefault();
    setIsDownload(true);
    const {
      data: { url },
    } = await axios.get(data.links.download_location, {
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
      },
    });
    const response = await fetch(url);
    const b = await response.blob();
    const blobUrl = URL.createObjectURL(b);
    a.href = blobUrl;
    a.click();
    setIsDownload(false);
  };

  const onLoadHandle = (event) => {
    event.target.classList.add(styles.load);
    event.target.parentNode.parentNode.classList.remove(
      styles.loading,
    );
    event.target.parentNode.parentNode.style.background = 'white';
  };
  return (
    <div
      className={[styles.container, styles.loading].join(' ')}
      style={{
        height,
        background: data.color,
      }}
    >
      <Link
        to={`${pathname}/${data.id}`}
        className={styles.photo}
        style={{ background: data.color }}
      >
        <img
          src={data.urls.small}
          alt={
            data.alt_description || data.description
              ? data.alt_description || data.description
              : data.id
          }
          onLoad={onLoadHandle}
        />
      </Link>
      <div
        className={[
          styles.like,
          data.liked_by_user ? styles.click : '',
        ].join(' ')}
        onClick={onLikeHandle}
      >
        <HeartIcon className={styles.icon} />
      </div>
      <div className={styles.user}>
        <Link
          className={styles.profile}
          to={`/users/${data.user.username}/photos`}
        >
          <img
            src={data.user.profile_image.medium}
            alt="user profle"
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
      <a
        href="!#"
        download={`${data.id}.jpg`}
        className={styles.download}
        onClick={downloadHandle}
      >
        <DownloadIcon className={styles.icon} />
        {isDownload ? (
          <MaterialSpinner color="white" className={styles.spinner} />
        ) : null}
      </a>
    </div>
  );
}

Photo.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.number,
};

export default React.memo(Photo);
