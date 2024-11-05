import type { GameContextType } from './types'
import CONST from './constants'
import { GameStatusType } from './types';
import { Chess } from 'chess.js'
const { ACTIONS } = CONST
const CG = new Chess()



export type ActionType = {
  type: string;
  payload: any;
  // payload: {
  //   chessGame: ChessType;
  //   position: Partial<GameContextType['position']>;
  //   gameStatus: Partial<GameStatusType> | null;
  //   currentFen: string;
  //   move: {
  //     from: string;
  //     to: string;
  //     piece: string;
  //     player: string;
  //   } 
  // };
}

export const gameReducer = (state: GameContextType, action: ActionType) => {
  switch (action.type) {
    case ACTIONS.NEW_GAME:
      console.log("🚀 ~ gameReducer ~ state:", state)
      
      return {
        ...action.payload,
      }
    case ACTIONS.MOVE_PIECE:
      return {
        ...state,
        position: action.payload.position,
        currentFen: action.payload.currentFen,

      }
    default:
      return {
        ...state,
      }  
  }
}
