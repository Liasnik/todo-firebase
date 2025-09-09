import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchTodos, addTodoApi, updateTodoApi, deleteTodoApi } from '../../api/todosApi';
import {
  loadTodosRequest,
  loadTodosSuccess,
  loadTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  editTodoRequest,
  editTodoSuccess,
  editTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
} from '../../features/todos/model/todosSlice';

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
  yield takeLatest(loadTodosRequest.type, loadTodosWorker);
  yield takeEvery(addTodoRequest.type, addTodoWorker);
  yield takeEvery(editTodoRequest.type, updateTodoWorker);
  yield takeEvery(deleteTodoRequest.type, deleteTodoWorker);
}
