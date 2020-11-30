import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
export function useSticky(onScrollDown, onScrollUp, sensitivity) {
  let oldScroll = useRef(0);
  const timer = useRef();
  sensitivity = sensitivity ? sensitivity : 20;
  useEffect(() => {
    const onScrollHandle = () => {
      let newScroll = window.pageYOffset;
      if (
        newScroll > oldScroll.current &&
        newScroll - oldScroll.current > sensitivity
      ) {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        setTimeout(() => {
          onScrollDown();
        }, 200);
      } else if (
        newScroll < oldScroll.current &&
        oldScroll.current - newScroll > sensitivity
      ) {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        setTimeout(() => {
          onScrollUp();
        }, 200);
      }
      oldScroll.current = newScroll;
    };
    window.addEventListener('scroll', onScrollHandle);
    return () => {
      window.removeEventListener('scroll', onScrollHandle);
    };
  }, [onScrollDown, onScrollUp, sensitivity]);
}

useSticky.propTypes = {
  onScrollDown: PropTypes.func,
  onScrollUp: PropTypes.func,
  sensitivity: PropTypes.number,
};
