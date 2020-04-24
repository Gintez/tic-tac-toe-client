import { all } from 'redux-saga/effects';

import usersSaga from './sagas/users';

export default function* rootSaga() {
  yield all([usersSaga()]);
}
