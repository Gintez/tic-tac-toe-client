import { handleActions } from 'redux-actions';
import { Action } from 'redux';

import { Players, BoardValues } from 'types';

import {
  setCurrentPlayer,
  startGame,
  setCellValue,
  addActionLog,
  endGame,
  setWinner
} from './actions/games';

interface DefaultState {
  currentPlayer: Players;
  isGameStarted: boolean;
  boardValues: BoardValues;
  actionsLogs: Array<Action>;
  winner: Players;
}

type Payload = any;

const defaultState: DefaultState = {
  currentPlayer: Players.PLAYER_1,
  isGameStarted: false,
  boardValues: {
    r1c1: null,
    r1c2: null,
    r1c3: null,
    r2c1: null,
    r2c2: null,
    r2c3: null,
    r3c1: null,
    r3c2: null,
    r3c3: null,
  },
  actionsLogs: [],
  winner: null,
};

const reducer = handleActions<DefaultState, Payload>(
  {
    [setCurrentPlayer.toString()]: (state, { payload }) => ({
      ...state,
      currentPlayer: payload,
    }),
    [startGame.toString()]: (state) => ({
      ...state,
      isGameStarted: true,
    }),
    [setCellValue.toString()]: (state, { payload }) => ({
      ...state,
      boardValues: {
        ...state.boardValues,
        [payload.cellId]: payload.cellValue,
      },
    }),
    [addActionLog.toString()]: (state, { payload }) => ({
      ...state,
      actionsLogs: [payload, ...state.actionsLogs],
    }),
    [endGame.toString()]: () => defaultState,
    [setWinner.toString()]: (state, { payload }) => ({
      ...state,
      winner: payload,
    }),
  },
  defaultState
);

export default reducer;
