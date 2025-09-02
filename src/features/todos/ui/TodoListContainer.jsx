import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos, editTodo, deleteTodo } from '../../../store/actions/todosActions';
import { selectTodosItems, selectTodosLoading, selectTodosError } from '../model/selectors';
import useListHeight from '../../../hooks/useListHeight';
import { MIN_LIST_HEIGHT } from '../model/config.js';
import TodoList from './TodoList.jsx';
import AddTodoForm from './AddTodoForm.jsx';
import styles from './TodoListContainer.module.css';

export default function TodoListContainer({ pageRef }) {
  const dispatch = useDispatch();
  const items = useSelector(selectTodosItems);
  const loading = useSelector(selectTodosLoading);
  const error = useSelector(selectTodosError);
  const listWrapRef = useRef(null);
  const listHeight = useListHeight(listWrapRef, pageRef, MIN_LIST_HEIGHT);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const onEdit = useCallback((todo, patch) => {
    dispatch(editTodo(todo, patch));
  }, [dispatch]);

  const onDelete = useCallback((id) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      dispatch(deleteTodo(items[index], index));
    }
  }, [dispatch, items]);

  return (
    <div className={styles.wrap}>
      <AddTodoForm />
      {error && <div className={styles.error}>Помилка: {String(error)}</div>}
      <div ref={listWrapRef} className={styles.listContainer}>
        {loading && <div className={styles.loaderOverlay}>Завантаження…</div>}
        <TodoList
          items={items}
          height={listHeight}
          onToggle={onEdit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}


