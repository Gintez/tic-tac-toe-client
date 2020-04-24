import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Players, BoardValues } from 'types';
import * as actions from 'store/actions/games';
import { getBoardValues, getWinner } from 'store/selectors';
import checkForWinner from 'helpers/check-for-winner';
import { State } from 'store';

import Board from './board';
import GameLogging from './game-logging';
import CurrentPlayer from './current-player';
import RestartButton from './restart-button';

interface StateProps {
  boardValues: BoardValues;
  currentWinner: Players;
}

interface DispatchProps {
  actions: typeof actions;
}

type Props = StateProps & DispatchProps;

const Game = (props: Props) => {
  const { boardValues, actions, currentWinner } = props;

  useEffect(() => {
    handleGameChange();
  }, [boardValues]);

  function handleGameChange() {
    const winner = checkForWinner(boardValues);
    if (winner && !currentWinner) {
      actions.setWinner(winner as Players);
    }
  }

  return (
    <div data-qa="game">
      <CurrentPlayer />
      <Board />
      <RestartButton />
      <GameLogging />
    </div>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  boardValues: getBoardValues(state),
  currentWinner: getWinner(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
