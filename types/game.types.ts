import type { Color, PieceSymbol, Square } from 'chess.js'

export interface BoardTile {
  color: Color;
  type: PieceSymbol;
  square: Square;
}

export type BoardRow = (BoardTile | null)[]; 

export type BoardType = BoardRow[];

export interface Move {
  from: Square;
  to: Square;
  promotion?: PieceSymbol;
}

