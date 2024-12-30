enum PlatformStatus {
  online,
  offline,
  playing_game,
  in_lobby,

}

export interface Chat {
  id: string;
  user_id: string;
  message: string;
  created_at: Date;
  lobby_id?: string;
  game_id?: string;
  username: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  email: string | null;
  created_at: Date;
  last_login?: Date;
  game_history?: string[];
  rating?: number;
  wins: number;
  losses: number;
  draw: number;
  status: PlatformStatus;
  avatar_url?: string;
}


enum GameType {
  ranked, casual
}

enum GameStatus {
  waiting_for_opponent,
  in_progress,
  open,
  completed,
}

enum EndGameStatus {
  checkmate,
  draw,
  resign,
  timeout,
  insufficient_material,
  three_fold_repetition,
}

enum EndResult {
  white_wins,
  black_wins,
  draw,
}

export interface Game {
  id: string;
  game_type: GameType;
  white_player_id: string;
  black_player_id: string;
  status: GameStatus;
  game_history: string[] | null;
  created_at: Date;
  last_updated_at: Date;
  end_game_status: EndGameStatus | null;
  results: EndResult | null;
  winner_id: string | null;
  fen: string | null;
  pgn: string | null;
}

export interface UserProfile {
  username: string;
  id: string;
  avatar_url?: string;
}