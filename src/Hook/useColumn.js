import { useEffect, useState, useCallback } from 'react';

export function useColumn() {
  const getColumn = useCallback(() => {
    const viewPortWidth =
      // window.visualViewport.width |
      document.documentElement.clientWidth |
      document.body.clientWidth;
    const num = Math.floor(viewPortWidth / 400);
    if (num) {
      return num;
    } else {
      return 1;
    }
  }, []);
  const [column, setColumn] = useState(getColumn());
  useEffect(() => {
    const updateColumn = () => setColumn(getColumn());
    window.addEventListener('resize', updateColumn);
    return () => {
      window.removeEventListener('resize', updateColumn);
    };
  }, [getColumn]);
  return column;
}
