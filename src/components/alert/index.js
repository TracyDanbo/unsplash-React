import React from 'react';
import alpha from 'color-alpha';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function Alert(props) {
  let { text, color, className, style } = props;
  color = color ? color : '#fcb1b1';
  const inlineStyle = {
    color: color,
    background: alpha(color, 0.2),
  };
  return (
    <div
      className={[styles.alert, className].join(' ')}
      style={{ ...inlineStyle, ...style }}
    >
      <p>{text}</p>
    </div>
  );
}

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Alert;
