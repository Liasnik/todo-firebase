import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const save = () => {
    if (text.trim() && text !== todo.text) {
      onEdit(todo, { text });
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (isEditing) {
      save();
    } else {
      // Sync editor with the latest todo text before entering edit mode
      setText(todo.text);
      setIsEditing(true);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setText(todo.text);
  };

  return (
    <div className={styles.row}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo, { completed: !todo.completed })}
      />
      {isEditing ? (
        <input
          className={styles.editInput}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? save() : (e.key === 'Escape' ? cancelEdit() : null)}

          autoFocus
        />
      ) : (
        <div className={styles.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </div>
      )}
      <div className={styles.buttons}>
        {isEditing ? (
          <>
            <button
              disabled={!text.trim()}
              className={styles.button}
              aria-label="Зберегти"
              title="Зберегти"
              onClick={save}
            >
              <Check size={18} />
            </button>
            <button
              className={`${styles.button} ${styles.dangerButton}`}
              aria-label="Відмінити"
              title="Відмінити"
              onClick={cancelEdit}
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.button}
              aria-label="Редагувати"
              title="Редагувати"
              onClick={handleEditClick}
            >
              <Pencil size={18}  />
            </button>
            <button
              className={`${styles.button} ${styles.dangerButton}`}
              aria-label="Видалити"
              title="Видалити"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}


