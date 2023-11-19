import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PieceSize, PiecePlayer } from '../../models/enums';
import { GameState } from '../../utils/types';

import {
  PlacePiecePayload,
  SelectPiecePayload,
  SetIntervalIdPayload,
  UpdateDurationPayload,
} from '../../utils/payloadTypes';

export const initialState: GameState = {
  gameEnded: false,
  isInGame: false,
  duration: 0,
  intervalId: undefined,
  startTime: null,

  cells: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],

  pieces: [
    {
      id: 1,
      position: [15, 1.5, 0],
      hasMoved: false,
      size: PieceSize.LARGE,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 2,
      position: [15, 1.5, 3],
      hasMoved: false,
      size: PieceSize.LARGE,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 3,
      position: [15, 1.5, 6],
      hasMoved: false,
      size: PieceSize.LARGE,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 4,
      position: [12, 0.9, 0],
      hasMoved: false,
      size: PieceSize.MEDIUM,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 5,
      position: [12, 0.9, 3],
      hasMoved: false,
      size: PieceSize.MEDIUM,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 6,
      position: [12, 0.9, 6],
      hasMoved: false,
      size: PieceSize.MEDIUM,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 7,
      position: [10, 0.57, 0],
      hasMoved: false,
      size: PieceSize.SMALL,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 8,
      position: [10, 0.57, 3],
      hasMoved: false,
      size: PieceSize.SMALL,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 9,
      position: [10, 0.57, 6],
      hasMoved: false,
      size: PieceSize.SMALL,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 10,
      position: [-15, 1.5, 0],
      size: PieceSize.LARGE,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 11,
      position: [-15, 1.5, -3],
      size: PieceSize.LARGE,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 12,
      position: [-15, 1.5, -6],
      size: PieceSize.LARGE,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 13,
      position: [-12, 0.9, 0],
      size: PieceSize.MEDIUM,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 14,
      position: [-12, 0.9, -3],
      size: PieceSize.MEDIUM,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 15,
      position: [-12, 0.9, -6],
      size: PieceSize.MEDIUM,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 16,
      position: [-10, 0.57, 0],
      size: PieceSize.SMALL,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 17,
      position: [-10, 0.57, -3],
      size: PieceSize.SMALL,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 18,
      position: [-10, 0.57, -6],
      size: PieceSize.SMALL,
      hasMoved: false,
      player: PiecePlayer.COMPUTER,
    },
  ],

  currentPlayer: PiecePlayer.HUMAN,
  activePiece: undefined,
  winner: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isInGame = true;
      state.startTime = Date.now();
    },

    endGame: (state) => {
      state.gameEnded = true;
      state.isInGame = false;
    },

    setIntervalId: (
      state,
      { payload }: PayloadAction<SetIntervalIdPayload>
    ) => {
      const { intervalId } = payload;
      state.intervalId = intervalId;
    },

    updateDuration: (
      state,
      { payload }: PayloadAction<UpdateDurationPayload>
    ) => {
      const { duration } = payload;
      state.duration = duration;
    },

    // resetTimer: (state) => {
    //   state.timeDuration = 0;
    // },
    // reducer functions and corresponding actions

    selectPiece: (state, { payload }: PayloadAction<SelectPiecePayload>) => {
      const { piece } = payload;

      if (piece && piece.hasMoved) state.activePiece = undefined;
      else return { ...state, activePiece: piece }; //PURE PAIN. THIS WAS PURE PAIN. Always change state immuntable when changing non-primitive types
    },

    unselectPiece: (state) => {
      state.activePiece = undefined;
    },

    placePiece: (state, { payload }: PayloadAction<PlacePiecePayload>) => {
      const { activePiece, cell } = payload;

      // find piece and update statuss
      const currentPiece = state.pieces[activePiece.id-1]

      const [cellX, cellY] = cell;

      // update piece status
      currentPiece!.hasMoved = true;
      // @ts-ignore
      currentPiece!.position = activePiece.position; //I don't know how to get this to work in TS

      // state.activePiece!.hasMoved = true;
      // 更新棋盘状态
      state.cells[cellX][cellY] = activePiece.id;

      state.currentPlayer =
        activePiece.player === PiecePlayer.HUMAN
          ? PiecePlayer.COMPUTER
          : PiecePlayer.HUMAN;
    },

    // TODO: Check winning condition
    checkWinner: (state, action) => {
      const { gamewinner } = action.payload;
      state.winner = gamewinner;
    },

    // ...其他 reducers
  },
});

// 导出 action creators
export const {
  startGame,
  setIntervalId,
  selectPiece,
  unselectPiece,
  placePiece,
  updateDuration,
  endGame,
} = gameSlice.actions;

// 导出 reducer
export default gameSlice.reducer;