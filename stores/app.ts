interface AppState {
  userId: string | null;
  username: string | null;
  lobbyId: string | null;
  gameId: string | null;
  lobbies: Array<{ id: string, name: string, players?: number }>;
} 


export const useAppStore = defineStore('app', {

  state: (): AppState => {
    return {
      userId: null,
      username: null,
      lobbyId: null,
      gameId: null,
      lobbies: []
    }
  },
  actions: {
    async getLobbyList() {
      const supabase = useSupabaseClient();
      try {
        const { data: lobby, error } = await supabase.from('lobby').select('*');

        if (error) {
          console.error(error);
          throw createError(error);
        }
       this.lobbies = lobby || []; 

      } catch (error) {
        throw createError(new Error(`${error}`));
      }
    },
    setUserId(userId: string) {
      this.userId = userId;
    },
    setUsername(username: string) {
      this.username = username;
    },
    setLobbyId(lobbyId: string) {
      this.lobbyId = lobbyId;
    },
    setGameId(gameId: string) {
      this.gameId = gameId
  }
}
})