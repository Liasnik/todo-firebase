import { useMemo, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { VIRTUALIZATION_BUFFER } from '../../../features/todos/model/config.js';
import styles from './VirtualizedList.module.css';

export default function VirtualizedList({ items, itemHeight = 40, height = 600, renderItem }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(height / itemHeight);
    const buffer = VIRTUALIZATION_BUFFER;
    const from = Math.max(0, start - buffer);
    const to = Math.min(items.length - 1, start + visibleCount + buffer);
    const y = from * itemHeight;
    return { startIndex: from, endIndex: to, offsetY: y };
  }, [scrollTop, itemHeight, height, items.length]);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;
    const maxScroll = Math.max(0, totalHeight - height);
    if (containerElement.scrollTop > maxScroll) {
      containerElement.scrollTop = maxScroll;
      setScrollTop(maxScroll);
    }
  }, [totalHeight, height]);

  const visibleItems = useMemo(() => {
    const arr = [];
    for (let i = startIndex; i <= endIndex; i += 1) {
      const item = items[i];
      if (item == null) continue;
      arr.push(
        <div key={item.id ?? i} style={{ height: itemHeight, boxSizing: 'border-box' }}>
          {renderItem(item, i)}
        </div>
      );
    }
    return arr;
  }, [items, startIndex, endIndex, itemHeight, renderItem]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={styles.container}
      style={{ height }}
    >
      <div className={styles.total} style={{ height: totalHeight }}>
        <div className={styles.inner} style={{ top: offsetY }}>
          {visibleItems}
        </div>
      </div>
    </div>
  );
}


