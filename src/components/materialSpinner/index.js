import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

function MaterialSpinner(props) {
  const { color, size, className, style } = props;
  return (
    <div className={className} style={style}>
      <svg
        className={styles.svg}
        viewBox="0 0 90 90"
        width={size}
        height={size}
      >
        <circle
          fill="none"
          stroke={color}
          strokeWidth="5px"
          strokeLinecap="round"
          cx={45}
          cy={45}
          r={40}
        ></circle>
      </svg>
    </div>
  );
}

MaterialSpinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default MaterialSpinner;
