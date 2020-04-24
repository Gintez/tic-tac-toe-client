import { all, take, call } from 'redux-saga/effects';

import { getUsers } from 'api/users';

import * as actions from '../actions/users';

export function* getUserFlow() {
  while (true) {
    yield take(actions.getUsers);
    const response = yield call(getUsers);
    console.log(response);
  }
}

export default function* usersSaga() {
  yield all([getUserFlow()]);
}