import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Ripple from './ripple';
import styles from './style.module.css';

function Button(props) {
  const {
    className,
    style,
    children,
    text,
    ripple,
    rippleBackground,
    onClick,
    ...otherProps
  } = props;
  const timer = useRef();
  const buttonRef = useRef();
  const [ripples, setRipples] = useState([]);

  // useEffect(() => {
  //   const button = buttonRef.current;
  //   if (window.PointerEvent) {
  //     button.addEventListener('pointerdown', onMouseDownHandle);
  //     button.addEventListener('pointerup', onMouseUpHandle);
  //   } else {
  //     button.addEventListener('mousedown', onMouseDownHandle);
  //     button.addEventListener('mouseup', onMouseUpHandle);
  //   }
  //   return () => {
  //     if (window.PointerEvent) {
  //       button.removeEventListener('pointerdown', onMouseDownHandle);
  //       button.removeEventListener('pointerup', onMouseUpHandle);
  //     } else {
  //       button.removeEventListener('mousedown', onMouseDownHandle);
  //       button.removeEventListener('mouseup', onMouseUpHandle);
  //     }
  //   };
  // });
  const onclickHandle = (event) => {
    onClick && onClick(event);
  };

  const onMouseDownHandle = (event) => {
    event.preventDefault();
    if (ripple) {
      const {
        left,
        top,
        width,
      } = event.target.getBoundingClientRect();
      const rectangle = {
        offsetLeft: event.pageX - window.scrollX - left - width / 2,
        offsetTop: event.pageY - window.scrollY - top - width / 2,
        offsetWidth: width,
        offsetHeight: width,
      };
      setRipples((state) =>
        state.concat(
          <Ripple
            key={new Date().getTime()}
            rippleBackground={rippleBackground}
            rectangle={rectangle}
          />,
        ),
      );
    }
  };
  const onMouseUpHandle = () => {
    if (ripple) {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          setRipples([]);
        }, 1000);
      } else {
        timer.current = setTimeout(() => {
          setRipples([]);
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        style={style}
        className={[styles.material, className].join(' ')}
        onClick={onclickHandle}
        onMouseDown={onMouseDownHandle}
        onMouseUp={onMouseUpHandle}
        onPointerDown={onMouseDownHandle}
        onPointerUp={onMouseUpHandle}
        {...otherProps}
      >
        {children ? children : text}
      </button>
      <div>{ripples.map((ripple) => ripple)}</div>
    </div>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  text: PropTypes.string,
  ripple: PropTypes.bool,
  rippleBackground: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
