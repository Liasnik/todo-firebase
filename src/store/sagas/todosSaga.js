import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { fetchTodos, addTodoApi, updateTodoApi, deleteTodoApi } from '../../api/todosApi';
import {
  LOAD_TODOS_REQUEST,
  ADD_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  DELETE_TODO_REQUEST
} from '../types/todosTypes';
import { 
  addTodoSuccess, addTodoFailure, 
  editTodoSuccess, editTodoFailure,
  deleteTodoSuccess, deleteTodoFailure,
  loadTodosSuccess, loadTodosFailure
} from '../actions/todosActions';

function* loadTodosWorker() {
  try {
    const data = yield call(fetchTodos);
    yield put(loadTodosSuccess(data));
  } catch (err) {
    yield put(loadTodosFailure(err.message));
  }
}

function* addTodoWorker(action) {
  const { id: tempId, text } = action.payload;
  try {
    const newTodo = yield call(addTodoApi, text);
    yield put(addTodoSuccess(newTodo, tempId));
  } catch (err) {
    yield put(addTodoFailure(err.message, tempId));
  }
}

function* updateTodoWorker(action) {
  const { todo, patch } = action.payload;
  try {
    const updated = yield call(updateTodoApi, todo.id, patch);
    yield put(editTodoSuccess(updated));
  } catch (err) {
    yield put(editTodoFailure(err.message, todo));
  }
}

function* deleteTodoWorker(action) {
  const { todo } = action.payload;
  try {
    yield call(deleteTodoApi, todo.id);
    yield put(deleteTodoSuccess(todo.id));
  } catch (err) {
    // The original index is provided by the component for precise rollback
    yield put(deleteTodoFailure(err.message, todo, action.payload.index));
  }
}

export function* todosSaga() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodosWorker);
  yield takeLeading(ADD_TODO_REQUEST, addTodoWorker);
  yield takeLeading(EDIT_TODO_REQUEST, updateTodoWorker);
  yield takeLeading(DELETE_TODO_REQUEST, deleteTodoWorker);
}
