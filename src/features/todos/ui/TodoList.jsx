import { useCallback, useMemo } from 'react';
import VirtualizedList from '../../../shared/ui/VirtualizedList/VirtualizedList.jsx';
import { ITEM_HEIGHT } from '../model/config.js';
import TodoItem from './TodoItem.jsx';

export default function TodoList({ items, height, onToggle, onEdit, onDelete, editing }) { 
  const { isEditing, getDraft, startEditing, changeDraft, cancelEditing, finishEditing } = editing;
  const editingApi = useMemo(() => ({
    isEditing,
    getDraft,
    startEditing,
    changeDraft,
    cancelEditing,
    finishEditing,
  }), [isEditing, getDraft, startEditing, changeDraft, cancelEditing, finishEditing]);

  const renderItem = useCallback(
    (todo) => (
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        editingActive={editingApi.isEditing(todo.id)}
        draftText={editingApi.getDraft(todo.id)}
        startEditing={editingApi.startEditing}
        changeDraft={editingApi.changeDraft}
        cancelEditing={editingApi.cancelEditing}
      />
    ),
    [onToggle, onEdit, onDelete, editingApi]
  );
  return (
    <VirtualizedList
      items={items}
      itemHeight={ITEM_HEIGHT}
      height={height}
      renderItem={renderItem}
      />
    );  
}


 