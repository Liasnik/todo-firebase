export const selectTodosState = (state) => state.todos;
export const selectTodosItems = (state) => state.todos.items;
export const selectTodosLoading = (state) => state.todos.loading;
export const selectTodosError = (state) => state.todos.error;
import { memoizeLast } from '../../../shared/lib/memoizeLast.js';

const computeStats = (items) => {
  const total = items.length;
  const completed = items.filter((todo) => todo.completed).length;
  const active = total - completed;
  return { total, completed, active };
};

const memoizedComputeStats = memoizeLast(computeStats);

export const selectTodosStats = (state) => memoizedComputeStats(selectTodosItems(state));


