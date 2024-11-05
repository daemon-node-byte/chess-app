import { Chess } from 'chess.js';

export type PlayerColorType = "white" | "black";
export type PieceRoleType = "rook" | "knight" | "bishop" | "queen" | "king" | "pawn";
export type CastlingRightsValueType = boolean | null
export type CastlingRightsType = {
  white: {
    king: CastlingRightsValueType,
    queen: CastlingRightsValueType,
  },
  black: {
    king: CastlingRightsValueType,
    queen: CastlingRightsValueType,
  }
}

export interface BoardSquare {
  coords: string;
  player: PlayerColorType | null;
  piece: PieceRoleType | null;
}

export interface GameDetailType {
  whoMovesNext: PlayerColorType;
  fullTurn: number;
  movesSinceCapture: number;
  castlingRights: CastlingRightsType;
  enPassant: boolean;
}

export type GameStatusType = 'not_started' | 'in_progress' | 'finished';

export type BoardRow = Array<BoardSquare>;

export type BoardDataType = Array<BoardRow>;

export type GameContextType = {
  chessGame: string | number | bigint | boolean | symbol | undefined | object | Function | null;
  position: any;
  currentFen: any;
  gameStatus: GameStatusType | null;
  dispatch?: any;
}

export interface DefaultSquareData {
  square: string;
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k' 
  color: 'w' | 'b'
}

export type DefaultBoardRow = Array<DefaultSquareData | null>

export type DefaultBoardDataType = Array<DefaultBoardRow>
