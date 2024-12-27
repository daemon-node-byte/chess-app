

export const useLobbyStore = defineStore('lobby', {
  state: () => ({
    onlineUsers: [],
    openGames: [],
    chatMessages: [],
  }),
  actions: {
    async fetchLobbyData(lobbyId: string) {
      const supabase = useSupabaseClient();
      const { data: users } = await supabase.from('users').select('*').eq('status', 'online');
      const { data: games } = await supabase.from('games').select('*').eq('status', 'open');
      const { data: chat } = await supabase.from('chat').select('*').eq('lobby_id', lobbyId);
      this.onlineUsers = users || [];
      this.openGames = games || [];
      this.chatMessages = chat || [];
    },
    async fetchChatMessages(lobbyId: string) {
      const supabase = useSupabaseClient();
      const { data: chat } = await supabase.from('chat').select('*').eq('lobby_id', lobbyId);
  
      this.chatMessages = chat || [];
    },
    async fetchOnlineUsers() {
      const supabase = useSupabaseClient();
      const { data: users } = await supabase.from('users').select('*');
      console.log("🚀 ~ fetchOnlineUsers ~ users:", users)
      this.onlineUsers = users || [];
    },
    async fetchOpenGames() {
      const supabase = useSupabaseClient();
      const { data: games } = await supabase.from('games').select('*').eq('status', 'open');
      this.openGames = games || [];
    },
  },
});
