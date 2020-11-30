import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
function Ripple(props) {
  const { rippleBackground, rectangle } = props;
  return (
    <div
      className={[styles.ripple, styles.animated].join(' ')}
      style={{
        background: rippleBackground,
        left: `${rectangle.offsetLeft}px`,
        top: `${rectangle.offsetTop}px`,
        width: `${rectangle.offsetWidth}px`,
        height: `${rectangle.offsetHeight}px`,
      }}
    />
  );
}

Ripple.propTypes = {
  rippleBackground: PropTypes.string.isRequired,
  rectangle: PropTypes.object.isRequired,
};

export default Ripple;
