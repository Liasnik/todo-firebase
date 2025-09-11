import { useCallback, useEffect, useState } from 'react';
import { calcListHeight } from '../utils/layout.js';

export default function useListHeight(listRef, pageRef, minHeight = 200) {
  const [listHeight, setListHeight] = useState(minHeight);

  const recalcListHeight = useCallback(() => {
    const listElement = listRef.current;
    const pageElement = pageRef.current;
    const height = calcListHeight(listElement, pageElement, minHeight);
    setListHeight(height);
  }, [listRef, pageRef, minHeight]);

  useEffect(() => {
    recalcListHeight();
    window.addEventListener('resize', recalcListHeight);
    return () => window.removeEventListener('resize', recalcListHeight);
  }, [recalcListHeight]);

  return listHeight;
}


