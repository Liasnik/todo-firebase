import { all, fork } from 'redux-saga/effects';
import { todosSaga } from './todosSaga';

export default function* rootSaga() {
  yield all([fork(todosSaga)]);
}