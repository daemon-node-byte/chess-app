interface ChatMessage {
  id: string;
  user_id: string;
  username: string;
  text: string;
  created_at: string;
  [key: string]: unknown;
}

export function useChat(roomId?: string) {
  const supabase = useSupabaseClient();
  const messages = ref<ChatMessage[]>([]);

  const channel = supabase.channel(roomId ? `room:${roomId}` : 'lobby');

  channel.on('broadcast', { event: 'message'}, (payload) => {
    messages.value.push(payload as unknown as ChatMessage);
  })

  channel.subscribe();

  function sendMessage(text: string, user_id: string, username: string) {
    channel.send({
      type: 'broadcast',
      event: 'message',
      payload: {
        text,
        user_id,
        username,
        created_at: new Date().toISOString()
      }
    });
  }
  return { messages, sendMessage };
}