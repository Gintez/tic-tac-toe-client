import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Dispatch, bindActionCreators } from 'redux';

import { isGameStarted } from 'store/selectors';
import StartGameButton from 'components/start-game-button';
import Game from 'components/game';
import { State } from 'store';
import * as userActions from 'store/actions/users';

const useStyles = createUseStyles({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
});

interface StateProps {
  isGameStarted: boolean;
}

interface DispatchProps {
  actions: {
    users: typeof userActions;
  }
}

type Props = StateProps & DispatchProps;

export const App = (props: Props) => {
  const { isGameStarted, actions } = props;
  const classes = useStyles();
  useEffect(() => {
    actions.users.getUsers();
  }, [])

  return (
    <div className={classes.root}>
      {isGameStarted ? <Game /> : <StartGameButton />}
    </div>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  isGameStarted: isGameStarted(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: {
    users: bindActionCreators(userActions, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
