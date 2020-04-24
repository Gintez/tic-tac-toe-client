import React from 'react';

import { renderWithProviders } from 'helpers/test-utils';
import * as actions from 'store/actions/games';
import { CellIds, Signs } from 'types';

import { GameLogging } from './game-logging';

describe('<GameLogging />', () => {
  it('should render the correct amount of game logs ', () => {
    const actionsLogging = [
      {
        type: actions.setCellValue.toString(),
        payload: { cellId: CellIds.r1c1, cellValue: Signs.O },
      },
      {
        type: 'any action'
      },
    ];

    const { queryAllByTestId } = renderWithProviders(
      <GameLogging actionsLogging={actionsLogging} />
    );
    const gameLogs = queryAllByTestId('game-log');

    expect(gameLogs.length).toBe(1);
  });
});
