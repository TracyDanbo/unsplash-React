import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';

const TextField = React.forwardRef((props, ref) => {
  let {
    styleClassName,
    className,
    style,
    type,
    label,
    labelText,
    color,
    errorColor,
    withLine,
    invalid,
    helperText,
    errorText,
    rAdornment,
    defaultValue,
    options,
    optionValues,
    onBlur,
    onFocus,
    onChange,
    onMouseDown,
    autoFocus,
    ...otherProps
  } = props;
  errorColor = errorColor ? errorColor : '#b00020';
  color = color ? color : '#707070';
  const labelRef = useRef();
  const inputRef = ref ? ref : useRef();
  const optionsRef = useRef();
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
    if (defaultValue) {
      inputRef.current.classList.add(styles.default);
      inputRef.current.classList.add(styles.hasValue);
    }
  }, [autoFocus, inputRef, defaultValue]);

  const onBlurHandle = (event) => {
    if (event.target.value && (label || withLine)) {
      event.target.classList.add(styles.hasValue);
    } else {
      event.target.classList.remove(styles.hasValue);
    }
    if (label) {
      labelRef.current.style.removeProperty('color');
    }
    if (options) {
      optionsRef.current.classList.remove(styles.open);
    }
    onBlur && onBlur();
  };

  const onFocusHandle = (event) => {
    if (label) {
      labelRef.current.style.color = invalid ? errorColor : color;
    }
    if (options) {
      optionsRef.current.classList.add(styles.open);
    }
    onFocus && onFocus();
  };

  const onMouseDownHandle = (event) => {
    if (options) {
      optionsRef.current.classList.add(styles.open);
      const { bottom } = inputRef.current.getBoundingClientRect();
      if (window.innerHeight - bottom <= 280) {
        optionsRef.current.style.top = ` -${
          (options.length + 2) * 100
        }%`;
      } else {
        optionsRef.current.style.removeProperty('top');
      }
    }
    inputRef.current.focus();

    if (options && event.target.tagName.toLowerCase() === 'li') {
      const option = event.target.dataset.option;
      inputRef.current.value = event.target.textContent;
      optionsRef.current.classList.remove(styles.open);
      onChange &&
        onChange({
          [labelText ? labelText.toLowerCase() : label.toLowerCase()]:
            option || inputRef.current.value,
        });
    }
    onMouseDown && onMouseDown();
    // if (inputRef.current.value) {
    //   event.preventDefault(); // prevent blur event
    //   inputRef.current.classList.add(styles.hasValue);
    // } else {
    //   inputRef.current.classList.remove(styles.hasValue);
    // }
  };

  return (
    <div
      className={[styles.container, className].join(' ')}
      style={style}
      onMouseDown={onMouseDownHandle}
    >
      <label
        className={[styles.field, styleClassName].join(' ')}
        style={{
          borderBottom: withLine ? '1px solid #707070' : 'none',
        }}
      >
        <input
          className={[
            styles.input,
            styleClassName,
            invalid && styles.error,
          ].join(' ')}
          // style={{ width: rAdornment ? 'calc(100% - 6rem)' : '100%' }}
          type={type}
          ref={inputRef}
          onFocus={onFocusHandle}
          onBlur={onBlurHandle}
          {...otherProps}
        />
        {rAdornment ? (
          <span
            className={[
              styles.adornment,
              styles.arrow,
              styleClassName,
            ].join(' ')}
          >
            {rAdornment}
          </span>
        ) : null}
        {withLine ? (
          <span
            className={[styles.line, styleClassName].join(' ')}
            style={{ borderColor: invalid ? errorColor : color }}
          ></span>
        ) : null}
        {label ? (
          <span
            className={[styles.label, styleClassName].join(' ')}
            ref={labelRef}
          >
            {label}
          </span>
        ) : null}
      </label>
      {errorText && invalid ? (
        <div className={styles.errorText}>{errorText}</div>
      ) : helperText ? (
        <div className={styles.helperText}>{helperText}</div>
      ) : null}
      {options ? (
        <ul className={styles.options} ref={optionsRef}>
          <li className={styles.item}>
            {defaultValue ? defaultValue : ''}
          </li>
          {options
            ? options.map((item, index) => {
                return (
                  <li
                    key={item}
                    className={styles.item}
                    data-option={
                      optionValues ? optionValues[index] : null
                    }
                  >
                    {item}
                  </li>
                );
              })
            : null}
        </ul>
      ) : null}
    </div>
  );
});

TextField.propTypes = {
  styleClassName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  labelText: PropTypes.string,
  color: PropTypes.string,
  errorColor: PropTypes.string,
  withLine: PropTypes.bool,
  invalid: PropTypes.bool,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  rAdornment: PropTypes.node,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  optionValues: PropTypes.arrayOf(PropTypes.string),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onMouseDown: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export default TextField;
