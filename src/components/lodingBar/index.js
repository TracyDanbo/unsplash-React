import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function LoadingBar(props) {
  const { style, className } = props;

  return (
    <div
      className={[styles.loadingBar, className].join(' ')}
      style={style}
    >
      <span className={styles.block}></span>
      <span className={styles.block}></span>
      <span className={styles.block}></span>
      <span className={styles.block}></span>
    </div>
  );
}

LoadingBar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default LoadingBar;
