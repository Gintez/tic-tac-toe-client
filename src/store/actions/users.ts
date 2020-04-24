import { createAction } from 'redux-actions';

import { NAMESPACE } from '../constants/users';

export const getUsers = createAction<void>(`${NAMESPACE}/GET_USERS`);
