import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from 'helpers/test-utils';
import { CellIds, Players, Signs } from 'types';
import { PLAYER_SIGNS } from 'types/constants';
import * as actions from 'store/actions/games';

import { Cell } from './cell';

const setCellValue = jest.fn();
const setCurrentPlayer = jest.fn();
const actionsMock = { ...actions, setCellValue, setCurrentPlayer };

describe('<Cell />', () => {
  describe('when cell value exists', () => {
    let wrapper: any;
    const actionsMock = { ...actions, setCellValue, setCurrentPlayer };
    const cellValue = Signs.O;

    beforeEach(() => {
      jest.clearAllMocks();
      wrapper = renderWithProviders(
        <Cell
          cellId={CellIds.r1c1}
          winner={null}
          currentPlayer={Players.PLAYER_1}
          cellValue={cellValue}
          actions={actionsMock}
        />
      );
    });

    it('should render cell value', () => {
      const { queryByText } = wrapper;
      const subject = queryByText(cellValue);

      expect(subject).toBeInTheDocument();
    });

    describe('on click', () => {
      it('should not call setCellValue', () => {
        const { getByTestId } = wrapper;
        const button = getByTestId('board-cell');
        fireEvent.click(button);

        expect(setCellValue).not.toBeCalled();
      });

      it('should not call setCurrentPlayer', () => {
        const { getByTestId } = wrapper;
        const button = getByTestId('board-cell');
        fireEvent.click(button);

        expect(setCurrentPlayer).not.toBeCalled();
      });
    });
  });

  describe('when cell has no value', () => {
    let wrapper: any;
    const currentPlayer = Players.PLAYER_1;
    const cellId = CellIds.r1c1;

    beforeEach(() => {
      jest.clearAllMocks();
      wrapper = renderWithProviders(
        <Cell
          cellId={cellId}
          winner={null}
          currentPlayer={currentPlayer}
          cellValue={null}
          actions={actionsMock}
        />
      );
    });

    describe('on click', () => {
      it('should call setCellValue', () => {
        const { getByTestId } = wrapper;
        const button = getByTestId('board-cell');
        fireEvent.click(button);

        expect(setCellValue).toBeCalledWith({
          cellId,
          cellValue: PLAYER_SIGNS[currentPlayer],
        });
      });

      it('should call setCurrentPlayer', () => {
        const { getByTestId } = wrapper;
        const button = getByTestId('board-cell');
        fireEvent.click(button);

        expect(setCurrentPlayer).toBeCalledWith(Players.PLAYER_2);
      });
    });
  });

  describe('when there is a winner', () => {
    let wrapper: any;
    const currentPlayer = Players.PLAYER_1;
    const cellId = CellIds.r1c1;
    const winner = Players.PLAYER_1;

    beforeEach(() => {
      jest.clearAllMocks();
      wrapper = renderWithProviders(
        <Cell
          cellId={cellId}
          winner={winner}
          currentPlayer={currentPlayer}
          cellValue={null}
          actions={actionsMock}
        />
      );
    });

    describe('on click', () => {
      it('should not call setCellValue', () => {
        const { getByTestId } = wrapper;
        const button = getByTestId('board-cell');
        fireEvent.click(button);

        expect(setCellValue).not.toBeCalled();
      });

      it('should not call setCurrentPlayer', () => {
        const { getByTestId } = wrapper;
        const button = getByTestId('board-cell');
        fireEvent.click(button);

        expect(setCurrentPlayer).not.toBeCalled();
      });
    });
  })
});
