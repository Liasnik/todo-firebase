import styles from './App.module.css'
import { useRef } from 'react';
import TodoListContainer from './features/todos/ui/TodoListContainer.jsx';
import TodoStats from './features/todos/ui/TodoStats.jsx';

function App() {
  const pageRef = useRef(null);

  return (
    <div ref={pageRef} className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>To Do List</h1>
        <TodoStats />
      </div>
      <TodoListContainer pageRef={pageRef} />
    </div>
  )
}

export default App
