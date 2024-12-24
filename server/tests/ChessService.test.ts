import { describe, it, expect } from "vitest";
import ChessService from "../services/ChessService";

describe("ChessService", () => {
  it('makes a valid move', () => {
    const chess = new ChessService();
    const move = chess.movePiece('e2', 'e4');
    expect(move).toBeTruthy();
    expect(chess.getFen()).toContain('4P3');
  })
})