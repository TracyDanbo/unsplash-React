import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
function LoadingDot(props) {
  let { size } = props;
  size = size ? size : 18;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1} style={style}></div>
      <div className={styles.bounce2} style={style}></div>
      <div className={styles.bounce3} style={style}></div>
    </div>
  );
}
LoadingDot.propTypes = {
  size: PropTypes.number,
};

export default LoadingDot;
