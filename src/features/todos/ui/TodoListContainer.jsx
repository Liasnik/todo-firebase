import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos } from '../../../store/actions/todosActions';
import { selectTodosItems, selectTodosLoading, selectTodosError } from '../model/selectors';
import useListHeight from '../../../hooks/useListHeight';
import { MIN_LIST_HEIGHT } from '../model/config.js';
import useTodoEditingState from '../../../hooks/useTodoEditingState.js';
import useTodoActions from '../../../hooks/useTodoActions.js';
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
  const editing = useTodoEditingState();
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const { onEdit, onToggle, onDelete } = useTodoActions(itemsRef);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);
 
  return (
    <div className={styles.wrap}>
      <AddTodoForm />
      {error && <div className={styles.error}>Помилка: {String(error)}</div>}
      <div ref={listWrapRef} className={styles.listContainer}>
        {loading && <div className={styles.loaderOverlay}>Завантаження…</div>}
        <TodoList
          items={items}
          height={listHeight}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          editing={editing}
        />
      </div>
    </div>
  );
}


