import React from 'react';
import PropTypes from 'prop-types';
import TextField from './textfield';
import { ReactComponent as ArrowIcon } from '../../assets/images/arrow_drop_down-black-18dp.svg';
import styles from './style.module.css';

export { TextField };
export const StandardTextField = React.forwardRef((props, ref) => {
  const {
    className,
    style,
    color,
    type,
    label,
    ...otherProps
  } = props;
  return (
    <TextField
      withLine
      styleClassName={styles.standard}
      className={className}
      label={label}
      type={type}
      color={color}
      ref={ref}
      {...otherProps}
    />
  );
});

export const FilledTextField = React.forwardRef((props, ref) => {
  const {
    className,
    style,
    color,
    type,
    label,
    ...otherProps
  } = props;
  return (
    <TextField
      withLine
      styleClassName={styles.filled}
      className={className}
      label={label}
      type={type}
      color={color}
      ref={ref}
      {...otherProps}
    />
  );
});

export const OutlinedTextField = React.forwardRef((props, ref) => {
  const {
    className,
    style,
    color,
    type,
    label,
    ...otherProps
  } = props;
  return (
    <TextField
      withLine
      styleClassName={styles.outlined}
      className={className}
      label={label}
      type={type}
      color={color}
      ref={ref}
      {...otherProps}
    />
  );
});

StandardTextField.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'tel',
    'search',
    'url',
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.string,
  color: PropTypes.string,
  errorColor: PropTypes.string,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  rAdornment: PropTypes.node,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
};

FilledTextField.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'tel',
    'search',
    'url',
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.string,
  color: PropTypes.string,
  errorColor: PropTypes.string,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  rAdornment: PropTypes.node,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
};

OutlinedTextField.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'tel',
    'search',
    'url',
  ]).isRequired,
  className: PropTypes.string,
  style: PropTypes.string,
  color: PropTypes.string,
  errorColor: PropTypes.string,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  rAdornment: PropTypes.node,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
};

export function TextSelect(props) {
  const { style, options, defaultValue, ...otherProps } = props;
  return (
    <TextField
      type="text"
      readOnly
      options={options}
      defaultValue={defaultValue}
      value={defaultValue}
      rAdornment={<ArrowIcon />}
      {...otherProps}
    />
  );
}

TextSelect.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
};

export function FilledSelect(props) {
  const { options, label, defaultValue, ...otherProps } = props;

  return (
    <TextField
      withLine
      type="text"
      styleClassName={styles.filledSelect}
      readOnly
      label={label}
      color="orange"
      value={defaultValue}
      rAdornment={<ArrowIcon />}
      options={options}
      {...otherProps}
    />
  );
}

FilledSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};

export function OutlinedSelect(props) {
  const { options, label, defaultValue, ...otherProps } = props;

  return (
    <TextField
      withLine
      type="text"
      styleClassName={styles.outlinedSelect}
      readOnly
      label={label}
      color="orange"
      value={defaultValue}
      rAdornment={<ArrowIcon />}
      options={options}
      defaultValue={defaultValue}
      {...otherProps}
    />
  );
}

OutlinedSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};

export function StandardSelect(props) {
  const { options, label, defaultValue, ...otherProps } = props;
  return (
    <TextField
      styleClassName={styles.standardSelect}
      type="text"
      readOnly
      label={label}
      defaultValue={defaultValue}
      value={defaultValue}
      options={options}
      rAdornment={<ArrowIcon />}
      {...otherProps}
    />
  );
}

StandardSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  withLine: PropTypes.bool,
};
