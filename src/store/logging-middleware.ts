import { addActionLog } from './actions/games';

const loggingMiddleware = (store: any) => (next: any) => (action: {
  type: string;
  payload: any;
}) => {

  if (action && action.type !== addActionLog.toString()) {
    store.dispatch(addActionLog(action));
  }
  next(action);
};

export default loggingMiddleware;
