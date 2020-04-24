import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import * as actions from 'store/actions/games';

import Button from './button';

interface DispatchProps {
  actions: typeof actions;
}

type Props = DispatchProps;

const RestartButton = (props: Props) => {
  const { actions } = props;

  function handleRestart() {
    actions.endGame();
  }

  return (<Button onClick={handleRestart}>Restart</Button>);
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(RestartButton);
