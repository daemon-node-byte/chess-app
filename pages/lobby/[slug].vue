<script setup lang="ts">
const lobbyStore = useLobbyStore();
const supabase = useSupabaseClient();
const route = useRoute();
const chatMessage = ref('');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages = ref<Partial<any>[]>([]);
  const onlineUsers = ref([]);
  const openGames = ref([]);
  
  
  onMounted(async () => {
    await lobbyStore.fetchLobbyData(route.params.slug as string);
    messages.value = lobbyStore.chatMessages;
    onlineUsers.value = lobbyStore.onlineUsers;
    openGames.value = lobbyStore.openGames;
    supabase.channel('realtime_chat')
    .on('system', { event: '*', schema: 'public', table: 'chat' }, () => {
      lobbyStore.fetchChatMessages(route.params.slug as string);
    })
    .on('system', { event: '*', schema: 'public', table: 'users' }, () => {
        lobbyStore.fetchOnlineUsers();
        console.log("🚀 ~ onlineUsers:", onlineUsers)
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'games' }, () => {
        lobbyStore.fetchOpenGames();
      })
      .subscribe();
});


// Methods
// const sendMessage = async () => {
//   if (!chatMessage.value.trim()) return;

//   const userId = lobbyStore.currentUserId;
//   if (!userId) {
//     console.error('User ID is not set');
//     return;
//   }

//   await supabase.from('chat').insert([{ user_id: lobbyStore.currentUserId, message: chatMessage.value }]);
//   chatMessage.value = '';
// };

// const inviteUser = (userId: string) => {
//   // Send invite logic
//   console.log(`Invite sent to user ${userId}`);
// };

// const joinGame = async (gameId: string) => {
//   await supabase.from('games').update({ opponent_user: lobbyStore.currentUserId, status: 'in_progress' }).eq('id', gameId);
// };

// const createGame = async () => {
//   await supabase.from('games').insert([{ host_user: lobbyStore.currentUserId, status: 'open' }]);
// };
</script>


<template>
  <UContainer class="flex flex-row gap-3">
    <div id="wrapper" class="h-dvh pb-[150px] w-2/3 relative">
      <div class="h-full overflow-clip flex sm:flex-row">


        <div id="chat-box"
          class="border border-primary border-b-0 w-full dark:bg-zinc-800 bg-zinc-200 flex flex-col justify-end px-4">
          <template v-for="(msg, index) in messages" :key="index">
            {{ console.log(msg) }}
            <div class="">
              <span class="text-xs">{{ new Date(msg?.created_at).toLocaleTimeString() }}</span>
              <span class="font-bold dark:text-blue-500 text-blue-600 p-1">{{ msg?.username }}</span>:<span class="px-2 text-lg">{{ msg?.message }}</span>
            </div>
          </template>
          

        </div>


      </div>

      <div class="w-full flex">

        <UInput v-model="chatMessage" size="lg" variant="outline" class="grow rounded-none border border-primary border-t-0"  />
        <UButton siz="lg" trailing-icon="i-tdesign-send" class="shrink rounded-none" label="send" />
      </div>
    </div>
    <div class="w-1/3">
      <UTabs :items="[{ label: 'Users' }, { label: 'Games' }]">
        <template #item="{ item }">
          <UCard>
            <template v-if="item.label === 'Users'">
              <ul class="space-y-5">
                <li v-for="user in onlineUsers" :key="user.id" class="relative w-full flex flex-row items-center">
                  <UAvatar :src="user.avatar || '#'" :alt="user.username" class="" />
                  <span class="ml-3">{{ user?.username }}</span>
                  <span class="pl-2 text-xs text-muted">{{ user?.status }}</span>
                  <UButton variant="ghost" @click="inviteUser(user?.id)" icon="i-fa6-solid-chess-board" class="right-0 absolute"/>
                </li>
              </ul>
              </template>
          </UCard>
        </template>
      </UTabs>
    </div>
  </UContainer>

  <!-- <div class="flex flex-col gap-6 p-6 h-screen"> -->
  <!-- <div class="grid grid-cols-3 gap-4 h-full"> -->
  <!-- Chat Section -->
  <!-- <section class="col-span-1 bg-gray-100 p-4 rounded-md shadow">
        <h2 class="text-lg font-semibold mb-2">Chat</h2>
        <div class="h-64 overflow-y-scroll bg-white p-2 rounded-md">
          <ul>
            <li
              v-for="(msg, index) in messages"
              :key="index"
              class="mb-2"
            >
              <strong>{{ msg.username }}:</strong> {{ msg.message }}
            </li>
          </ul>
        </div>
        <div class="mt-4 flex gap-2">
          <input
            v-model="chatMessage"
            placeholder="Type a message"
            class="flex-grow p-2 border rounded-md"
          />
          <button @click="sendMessage" class="p-2 bg-blue-500 text-white rounded-md">
            Send
          </button>
        </div>
      </section> -->

  <!-- Users Section -->
  <!-- <section class="col-span-1 bg-gray-100 p-4 rounded-md shadow">
        <h2 class="text-lg font-semibold mb-2">Users</h2>
        <ul>
          <li
            v-for="user in onlineUsers"
            :key="user.id"
            class="flex justify-between items-center mb-2"
          >
            <span>{{ user.username }}</span>
            <button
              @click="inviteUser(user.id)"
              class="p-1 bg-green-500 text-white rounded-md"
            >
              Invite
            </button>
          </li>
        </ul>
      </section> -->

  <!-- Games Section -->
  <!-- <section class="col-span-1 bg-gray-100 p-4 rounded-md shadow">
        <h2 class="text-lg font-semibold mb-2">Open Games</h2>
        <ul>
          <li
            v-for="game in openGames"
            :key="game.id"
            class="flex justify-between items-center mb-2"
          >
            <span>Game by {{ game.host }}</span>
            <button
              @click="joinGame(game.id)"
              class="p-1 bg-blue-500 text-white rounded-md"
            >
              Join
            </button>
          </li>
        </ul>
        <button
          @click="createGame"
          class="w-full mt-4 p-2 bg-purple-500 text-white rounded-md"
        >
          Create Game
        </button>
      </section> -->
  <!-- </div> -->
  <!-- </div> -->
</template>
