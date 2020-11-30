import React from 'react';
import Button from './button';
import alpha from 'color-alpha';
import PropTypes from 'prop-types';
import styles from './style.module.css';

export function OutlinedButton(props) {
  const { className, style, color, ...otherProps } = props;
  const inlineStyle = {
    color,
    borderColor: color,
    ...style,
  };
  const onMouseOverHandle = (event) => {
    let flags = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    );
    if (!flags) {
      event.target.style.background = alpha(color, 0.05);
    }
  };
  const onMouseLeaveHandle = (event) => {
    let flags = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    );
    if (!flags) {
      event.target.style.removeProperty('background');
    }
  };
  return (
    <Button
      className={[styles.outlined, className].join(' ')}
      style={inlineStyle}
      ripple={true}
      rippleBackground={color}
      onMouseOver={onMouseOverHandle}
      onMouseLeave={onMouseLeaveHandle}
      {...otherProps}
    />
  );
}

export function TextButton(props) {
  const { className, style, color, ...otherProps } = props;
  const inlineStyle = {
    color,
    ...style,
  };
  const onMouseOverHandle = (event) => {
    let flags = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    );
    if (!flags) {
      event.currentTarget.style.background = alpha(color, 0.05);
    }
  };
  const onMouseLeaveHandle = (event) => {
    let flags = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    );
    if (!flags) {
      event.currentTarget.style.removeProperty('background');
    }
  };
  return (
    <Button
      className={[styles.text, className].join(' ')}
      style={inlineStyle}
      ripple={true}
      rippleBackground={color}
      onMouseOver={onMouseOverHandle}
      onMouseLeave={onMouseLeaveHandle}
      {...otherProps}
    />
  );
}

export function ContainedButton(props) {
  const { className, style, color, ...otherProps } = props;
  const inlineStyle = {
    background: color,
    ...style,
  };
  return (
    <Button
      className={[styles.contained, className].join(' ')}
      style={inlineStyle}
      ripple={true}
      rippleBackground="white"
      {...otherProps}
    />
  );
}

OutlinedButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  ripple: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
TextButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  ripple: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
ContainedButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  ripple: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
