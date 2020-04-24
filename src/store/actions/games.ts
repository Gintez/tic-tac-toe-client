import { createAction } from 'redux-actions';
import { Action } from 'redux';

import { Players, Signs } from 'types';

import { NAMESPACE } from '../constants/games';

export const setCurrentPlayer = createAction<Players>(`${NAMESPACE}/SET_CURRENT_PLAYER`);
export const startGame = createAction<void>(`${NAMESPACE}/START_GAME`);
export const setCellValue = createAction<{ cellId: string, cellValue: Signs }>(`${NAMESPACE}/SET_CELL_VALUE`);
export const addActionLog = createAction<Action>(`${NAMESPACE}/ADD_ACTION_LOG`);
export const endGame = createAction<void>(`${NAMESPACE}/END_GAME`);
export const setWinner = createAction<Players>(`${NAMESPACE}/SET_WINNER`);
