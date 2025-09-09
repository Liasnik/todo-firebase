import { memo } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, onToggle, onEdit, onDelete, editing }) {
  const { isEditing, getDraft, startEditing, changeDraft, cancelEditing } = editing;
  const editingActive = isEditing(todo.id);
  const draftText = getDraft(todo.id);

  const trimmedDraft = draftText.trim();
  const canSave = trimmedDraft.length > 0;

  const save = () => {
    if (canSave && trimmedDraft !== todo.text) {
      onEdit(todo, { text: trimmedDraft });
    }
    cancelEditing(todo.id);
  };

  const handleEditClick = () => {
    if (editingActive) {
      save();
    } else {
      startEditing(todo.id, todo.text);
    }
  };

  const cancelEdit = () => {
    cancelEditing(todo.id);
  };

  return (
    <div className={styles.row}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo, { completed: !todo.completed })}
      />
      {editingActive ? (
        <input
          className={styles.editInput}
          value={draftText}
          onChange={e => changeDraft(todo.id, e.target.value)}
          onKeyDown={e => e.key === 'Enter' ? save() : (e.key === 'Escape' ? cancelEdit() : null)}

          autoFocus
        />
      ) : (
        <div className={styles.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </div>
      )}
      <div className={styles.buttons}>
        {editingActive ? (
          <>
            <button
              disabled={!canSave}
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

export default memo(TodoItem);


