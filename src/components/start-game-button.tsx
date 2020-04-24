import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Button from 'components/button';
import * as actions from 'store/actions/games';

interface DispatchProps {
  actions: typeof actions;
}

type Props = DispatchProps;

const StartGameButton = (props: Props) => {
  const { actions } = props;

  function handleGameStart() {
    actions.startGame();
  }

  return (
    <div data-qa="button--start-game">
      <Button onClick={handleGameStart}>Start game</Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(StartGameButton);
