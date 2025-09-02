import VirtualizedList from '../../../shared/ui/VirtualizedList/VirtualizedList.jsx';
import { ITEM_HEIGHT } from '../model/config.js';
import TodoItem from './TodoItem.jsx';

export default function TodoList({ items, height, onToggle, onEdit, onDelete }) {
  return (
    <VirtualizedList
      items={items}
      itemHeight={ITEM_HEIGHT}
      height={height}
      renderItem={(todo) => (
        <TodoItem
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
}


 