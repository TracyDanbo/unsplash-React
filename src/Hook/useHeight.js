import { useCallback } from 'react';
import { useColumn } from './useColumn';

export const useHeight = ({ sourceWidth, sourceHeight }) => {
  const columns = useColumn();
  const getHeight = useCallback(
    (sourceWdith, sourceHeight) => {
      const viewPortWidth =
        document.documentElement.clientWidth |
        document.body.clientWidth;
      if (columns > 1 && viewPortWidth - 400 * columns >= 0) {
        return Math.floor((sourceHeight / sourceWdith) * 380);
      } else if (columns === 1 && viewPortWidth <= 420) {
        return Math.floor(
          (sourceHeight / sourceWdith) * (viewPortWidth - 20),
        );
      } else if (columns === 1 && viewPortWidth > 420) {
        return Math.floor((sourceHeight / sourceWdith) * 400);
      }
    },
    [columns],
  );
  return getHeight(sourceWidth, sourceHeight);
};
