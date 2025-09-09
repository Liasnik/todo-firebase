import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo, deleteTodo } from '../store/actions/todosActions.js';

export default function useTodoActions(itemsRef) {
  const dispatch = useDispatch();

  const onEdit = useCallback((todo, patch) => {
    dispatch(editTodo(todo, patch));
  }, [dispatch]);

  const onToggle = useCallback((todo, patch) => {
    dispatch(editTodo(todo, patch));
  }, [dispatch]);

  const onDelete = useCallback((id) => {
    const items = itemsRef?.current ?? [];
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      dispatch(deleteTodo(items[index], index));
    }
  }, [dispatch, itemsRef]);

  return { onEdit, onToggle, onDelete };
}




