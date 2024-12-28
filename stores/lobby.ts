import type { Database } from "~/types/database.types";

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
      this.onlineUsers = users || [];
    },
    async fetchOpenGames() {
      const supabase = useSupabaseClient();
      const { data: games } = await supabase.from('games').select('*').eq('status', 'open');
      this.openGames = games || [];
    },
    async addChatMessage(message: string, lobbyId: string) {
      const user = useSupabaseUser();
      const supabase = useSupabaseClient<Database>();
      if (!user.value) {
        throw createError('You must be logged in to send a message');
      }
      const { data, error } = await supabase.from('chat').insert([{ user_id: user.value.id, message: message, lobby_id: lobbyId,}]).select('*')
      if (error) {
        console.error('Error adding chat message:', error);
        throw createError('Failed to add chat message');
      }
      if (data) {
        console.log('Chat message added:', data);
        return data
      }
    },
  },
});
