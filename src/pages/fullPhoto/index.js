import React, { useEffect, useRef } from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Info from './info';
import { ReactComponent as ClearIcon } from '../../assets/images/clear-white-18dp.svg';
import { ReactComponent as InfoIcon } from '../../assets/images/info-white-18dp.svg';
import MaterialSpinner from '../../components/materialSpinner';
import * as actions from '../../actions';
import styles from './style.module.css';
import { usePosition } from '../../Hook';
function FullPhoto(props) {
  usePosition();
  const {
    params: { photoId },
  } = useRouteMatch();
  const data = useSelector((state) => state.unsplash.photo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getPhoto(photoId));
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [dispatch, photoId]);

  const container = useRef();
  const history = useHistory();
  const showInfo = (event) => {
    try {
      const info = container.current.querySelector(`.${styles.info}`);
      const clear = container.current.querySelector(
        `.${styles.clear}`,
      );
      info.classList.toggle(styles.show);
      clear.classList.toggle(styles.switch);
      event.currentTarget.classList.toggle(styles.switch);
    } catch (e) {
      console.log(e);
    }
  };

  const goback = (event) => {
    history.goBack();
    dispatch(actions.clearPhoto());
  };

  let content = (
    <MaterialSpinner
      color="pink"
      className={styles.spinner}
      style={{
        width:
          window.innerWidth * 0.1 > 80 ? 80 : window.innerWidth * 0.1,
        height:
          window.innerWidth * 0.1 > 80 ? 80 : window.innerWidth * 0.1,
      }}
    />
  );
  if (data) {
    const info = {
      ...data.exif,
      color: data.color,
      width: data.width,
      height: data.height,
    };
    content = (
      <>
        <div className={styles.photo}>
          <img src={data.urls.raw} alt="raw" />
        </div>
        <div className={styles.info}>
          <Info info={info} />
          <ul className={styles.tags}>
            {data.tags.map((tag) => (
              <li key={tag.title}>
                <Link to={`/search/photos/${tag.title}`}>
                  {tag.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
  return (
    <div className={styles.fullPhoto} ref={container}>
      {content}
      <div className={styles.clear} onClick={goback}>
        <ClearIcon />
      </div>
      <div className={styles.showInfo} onClick={showInfo}>
        <InfoIcon />
      </div>
    </div>
  );
}

export default FullPhoto;
