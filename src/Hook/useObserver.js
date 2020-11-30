import { useRef } from 'react';

const defaultOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
  delay: 200,
};

export function useObserver(action, option) {
  option = option
    ? {
        ...defaultOption,
        ...option,
      }
    : defaultOption;
  const observer = useRef();
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      action(entry, observer);
    });
  };
  observer.current = new IntersectionObserver(callback, option);
  return observer.current;
}
