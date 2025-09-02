import { useSelector } from 'react-redux';
import { selectTodosStats } from '../model/selectors';
import styles from './TodoStats.module.css';

export default function TodoStats() {
  const { total, active, completed } = useSelector(selectTodosStats);

  return (
    <div className={styles.stats}>
      <div>Всього: <span className={styles.value}>{total}</span></div>
      <div>Активних: <span className={styles.value}>{active}</span></div>
      <div>Виконаних: <span className={styles.value}>{completed}</span></div>
    </div>
  );
}
