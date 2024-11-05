import { createContext } from "react";
import type { GameContextType } from './types'

export const initContext: GameContextType = {
  chessGame: null,
  position: [],
  gameStatus: 'not_started',
  currentFen: null,
}

export const GameContext = createContext<GameContextType | null>(null)


