import { Chess } from 'chess.js';

export default class ChessService {
  private game: Chess;
  constructor(fen?: string) {
    this.game = new Chess(fen);
  }

  movePiece(from: string, to: string) {
    const move = this.game.move({ from, to });
    return move;
  }

  getBoard() {
    return this.game.board();
  }

  getFen() {
    return this.game.fen();
  }

  getTurn() {
    return this.game.turn();
  }

  getHistory() {
    return this.game.history();
  }

  undoLastMove() {
    return this.game.undo();
  }

}