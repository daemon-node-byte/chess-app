import type { PieceSymbol, Color, Square } from 'chess.js';
import { Chess } from 'chess.js';

export const getPieceIconName = (pieceSymbol: PieceSymbol) => {
  const prefix = 'i-fa6-solid-chess-';
  switch (pieceSymbol) {
    case 'p':
      return prefix + 'pawn';
    case 'r':
      return prefix + 'rook';
    case 'n':
      return prefix + 'knight';
    case 'b':
      return prefix + 'bishop';
    case 'q':
      return prefix + 'queen';
    case 'k':
      return prefix + 'king';
    default:
      return '';
  }
}
export const getColorClassName = (color: Color) => {
  return color === 'w' ? 'text-neutral-50 !stroke-[15px] !stroke-black' : 'text-zinc-800 !stroke-[15px] !stroke-white';
}

export interface TileData {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

export class ChessGame {
  public game: Chess;
  constructor() {
    this.game = new Chess();
  }

  getPosition() {
    return this.game.board();
  }

  movePiece(from: string, to: string) {
    return this.game.move({ from, to });
  }

  getHistory() {
    return this.game.history({ verbose: true });
  }

  currentTurn() {
    return this.game.turn() === 'w' ? 'white' : 'black';
  }

  getPgnFromHistory(): string {
    const history = this.getHistory();
    let pgn = "";
    let moveNumber = 1;
  
    history.forEach((move, index) => {
      // Add the move number for white's move
      if (move.color === "w") {
        pgn += `${moveNumber}. `;
        moveNumber++;
      }
  
      // Add the move in SAN (Standard Algebraic Notation)
      pgn += move.san;
  
      // Add a space after the move unless it's the last move
      if (index < history.length - 1) {
        pgn += " ";
      }
    });
  
    return pgn.trim();
  }

}