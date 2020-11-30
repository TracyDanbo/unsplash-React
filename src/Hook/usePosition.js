import { useEffect } from 'react';
export function usePosition() {
  useEffect(() => {
    const path = window.location.pathname;
    const pageY = sessionStorage.getItem(path);
    if (pageY) {
      window.scrollTo({
        top: pageY,
        behavior: 'smooth',
      });
    }
    return () => {
      sessionStorage.setItem(path, window.pageYOffset);
    };
  }, []);
}
