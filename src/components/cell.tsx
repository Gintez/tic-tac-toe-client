import React from 'react';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import clsx from 'clsx';

import { Players, Signs, CellIds } from 'types';
import { PLAYER_SIGNS } from 'types/constants';
import { getCellValue, getCurrentPlayer, getWinner } from 'store/selectors';
import * as actions from 'store/actions/games';
import { State } from 'store';

const useStyles = createUseStyles({
  root: {
    height: 150,
    width: 150,
    backgroundColor: 'grey',
    border: '1px solid white',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 30,
  },
  disabled: {
    opacity: 0.5
  }
});

interface DispatchProps {
  actions: typeof actions;
}

interface OwnProps {
  cellId: CellIds;
}

interface StateProps {
  cellValue: Signs;
  currentPlayer: Players;
  winner: Players;
}

type Props = OwnProps & StateProps & DispatchProps;

export const Cell = (props: Props) => {
  const classes = useStyles();
  const { cellValue, actions, cellId, currentPlayer, winner } = props;

  function togglePlayer() {
    const nextPlayer = currentPlayer == Players.PLAYER_1
      ? Players.PLAYER_2
      : Players.PLAYER_1;

    actions.setCurrentPlayer(nextPlayer);
  }

  function setCellValue() {
    actions.setCellValue({
      cellId,
      cellValue: PLAYER_SIGNS[currentPlayer],
    });

    togglePlayer();
  }

  function handleCellClick() {
    !cellValue && !winner && setCellValue();
  }

  return (
    <div
      data-qa="board-cell"
      onClick={handleCellClick}
      className={clsx(classes.root, { [classes.disabled]: !!winner })}
    >
      {cellValue || ''}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  cellValue: getCellValue(state, { cellId: ownProps?.cellId }),
  currentPlayer: getCurrentPlayer(state),
  winner: getWinner(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
