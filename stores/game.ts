import { ChessGame } from "~/utils/chess.utils";

interface GameState {
  game: ChessGame | null;
  positionArray: Array<Record<string, string> | null>[];
  pgn: string;
  whitePlayer: string | null;
  blackPlayer: string | null;
  gameChat: Array<{ user: string, message: string }>;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => {
    return {
      positionArray: [],
      pgn: '',
      whitePlayer: null,
      blackPlayer: null,
      gameChat: []
      
    }
  },
  actions: {
    async createGame() {
      const game = new ChessGame();
      this.game = game;
      this.positionArray = game.getPosition();
    }
  }
})