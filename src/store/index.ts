import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import { loadState, saveState } from 'helpers/session-storage';

import createRootReducer from './reducer';
import loggingMiddleware from './logging-middleware';
import sagas from './root-saga';

const configureStore = () => {
  const persistedState = loadState();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    loggingMiddleware,
  ];

  const store = createStore(
    createRootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  sagaMiddleware.run(sagas);

  return store;
};

export type State = ReturnType<typeof store.getState>;

const store = configureStore();

export default store;
