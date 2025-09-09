import { useCallback, useState } from 'react';

export default function useTodoEditingState() {
  const [editingById, setEditingById] = useState(() => ({}));

  const startEditing = useCallback((id, initialText) => {
    setEditingById(prev => ({
      ...prev,
      [id]: { isEditing: true, draftText: initialText ?? '' },
    }));
  }, []);

  const changeDraft = useCallback((id, nextText) => {
    setEditingById(prev => {
      const current = prev[id];
      if (!current) return prev;
      if (current.draftText === nextText) return prev;
      return { ...prev, [id]: { ...current, draftText: nextText } };
    });
  }, []);

  const cancelEditing = useCallback((id) => {
    setEditingById(prev => ({ ...prev, [id]: { isEditing: false, draftText: prev[id]?.draftText ?? '' } }));
  }, []);

  const finishEditing = useCallback((id) => {
    const state = editingById[id];
    return state?.draftText ?? '';
  }, [editingById]);

  const isEditing = useCallback((id) => Boolean(editingById[id]?.isEditing), [editingById]);
  const getDraft = useCallback((id) => editingById[id]?.draftText ?? '', [editingById]);

  return {
    isEditing,
    getDraft,
    startEditing,
    changeDraft,
    cancelEditing,
    finishEditing,
  };
}




