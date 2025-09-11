import { call, put, takeLatest, takeLeading, take, race, delay, fork, takeEvery } from 'redux-saga/effects';
import { fetchTodos, addTodoApi, updateTodoApi, deleteTodoApi } from '../../api/todosApi';
import {
  LOAD_TODOS_REQUEST,
  ADD_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  DELETE_TODO_REQUEST
} from '../types/todosTypes';
import { ADD_TODO_SUCCESS, ADD_TODO_FAILURE, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE } from '../types/todosTypes';
import { clearTodosError } from '../actions/todosActions';
import {
  addTodoSuccess, addTodoFailure,
  editTodoSuccess, editTodoFailure,
  deleteTodoSuccess, deleteTodoFailure,
  loadTodosSuccess, loadTodosFailure,
  // loadTodos,
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
    // Дополнительно: синхронизация с сервером, если порядок мог измениться
    // yield put(loadTodos());
  }
}

export function* todosSaga() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodosWorker);
  yield takeLeading(ADD_TODO_REQUEST, addTodoWorker);
  yield takeEvery(EDIT_TODO_REQUEST, updateTodoWorker);
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodoWorker);
  // Отдельный сторож для оптимистичных добавлений: если не пришёл SUCCESS/FAILURE, делаем откат
  yield fork(watchAddTodoRequestsForRollback);
  yield fork(watchEditTodoRequestsForRollback);
  yield fork(watchDeleteTodoRequestsForRollback);
}

// --- Watchdog: откатывает оптимистичное добавление, если нет подтверждения за таймаут ---
function* watchAddTodoRequestsForRollback() {
  while (true) {
    const action = yield take(ADD_TODO_REQUEST);
    yield fork(addTodoRollbackIfNoConfirm, action);
  }
}

function* addTodoRollbackIfNoConfirm(action) {
  const tempId = action.payload?.id;
  if (tempId == null) return;
  const result = yield race({
    success: take(a => a.type === ADD_TODO_SUCCESS && a.payload?.tempId === tempId),
    failure: take(a => a.type === ADD_TODO_FAILURE && a.payload?.tempId === tempId),
    timeout: delay(8000), // таймаут на подтверждение
  });
  if (result.timeout) {
    yield put(addTodoFailure('Timeout: no server confirmation', tempId));
    yield delay(3000);
    yield put(clearTodosError());
  }
}

// EDIT watchdog
function* watchEditTodoRequestsForRollback() {
  while (true) {
    const action = yield take(EDIT_TODO_REQUEST);
    yield fork(editTodoRollbackIfNoConfirm, action);
  }
}

function* editTodoRollbackIfNoConfirm(action) {
  const originalTodo = action.payload?.todo;
  const result = yield race({
    success: take(a => a.type === EDIT_TODO_SUCCESS && a.payload?.id === originalTodo?.id),
    failure: take(a => a.type === EDIT_TODO_FAILURE && a.payload?.originalTodo?.id === originalTodo?.id),
    timeout: delay(8000),
  });
  if (result.timeout) {
    yield put(editTodoFailure('Timeout: no server confirmation', originalTodo));
    yield delay(3000);
    yield put(clearTodosError());
  }
}

// DELETE watchdog
function* watchDeleteTodoRequestsForRollback() {
  while (true) {
    const action = yield take(DELETE_TODO_REQUEST);
    yield fork(deleteTodoRollbackIfNoConfirm, action);
  }
}

function* deleteTodoRollbackIfNoConfirm(action) {
  const { todo, index } = action.payload || {};
  const result = yield race({
    success: take(a => a.type === DELETE_TODO_SUCCESS && a.payload?.id === todo?.id),
    failure: take(a => a.type === DELETE_TODO_FAILURE && a.payload?.originalTodo?.id === todo?.id),
    timeout: delay(8000),
  });
  if (result.timeout) {
    yield put(deleteTodoFailure('Timeout: no server confirmation', todo, index));
    yield delay(3000);
    yield put(clearTodosError());
    // На случай некорректной позиции вернём истинное состояние с сервера
    // yield put(loadTodos());
  }
}
