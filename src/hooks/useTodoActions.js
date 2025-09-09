import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editTodoRequest, deleteTodoRequest } from '../features/todos/model/todosSlice.js';

export default function useTodoActions(itemsRef) {
  const dispatch = useDispatch();

  const onEdit = useCallback((todo, patch) => {
    dispatch(editTodoRequest({ todo, patch }));
  }, [dispatch]);

  const onToggle = useCallback((todo, patch) => {
    dispatch(editTodoRequest({ todo, patch }));
  }, [dispatch]);

  const onDelete = useCallback((id) => {
    const items = itemsRef?.current ?? [];
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      dispatch(deleteTodoRequest({ todo: items[index], index }));
    }
  }, [dispatch, itemsRef]);

  return { onEdit, onToggle, onDelete };
}




