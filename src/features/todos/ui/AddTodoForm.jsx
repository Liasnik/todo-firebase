import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addTodoRequest } from '../../todos/model/todosSlice';
import styles from './AddTodoForm.module.css';

export default function AddTodoForm() {
  const [newText, setNewText] = useState('');
  const dispatch = useDispatch();

  const onAdd = useCallback(() => {
    const text = newText.trim();
    if (!text) return;
    dispatch(addTodoRequest({ text, id: nanoid() }));
    setNewText('');
  }, [dispatch, newText]);

  const canAdd = newText.trim().length > 0;

  return (
    <div className={styles.controls}>
      <input
        className={styles.input}
        placeholder="Нове завдання"
        value={newText}
        onChange={e => setNewText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onAdd()}
      />
      <button className={styles.addBtn} onClick={onAdd} disabled={!canAdd}>
        Додати
      </button>
    </div>
  );
}
