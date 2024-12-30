<script setup lang="ts">
import type { Chat, UserProfile, Game } from '~/types'
const lobbyStore = useLobbyStore();
const supabase = useSupabaseClient();
const currentUser = useSupabaseUser();
const route = useRoute();
const chatMessage = ref('');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages = ref<Chat[] | any[]>([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onlineUsers = ref<UserProfile[] | any[]>([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openGames = ref<Partial<Game>[] | any[]>([]);

  const LOBBY_ID = route.params.slug as string;
  
  onMounted(async () => {
    await lobbyStore.fetchLobbyData(LOBBY_ID);
    messages.value = lobbyStore.chatMessages;
    onlineUsers.value = lobbyStore.onlineUsers;
    openGames.value = lobbyStore.openGames;
    supabase.channel('realtime_chat')
    .on('system', { event: '*', schema: 'public', table: 'chat' }, () => {
      lobbyStore.fetchChatMessages(LOBBY_ID);
    })
    .on('system', { event: '*', schema: 'public', table: 'users' }, () => {
        lobbyStore.fetchOnlineUsers();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'games' }, () => {
        lobbyStore.fetchOpenGames();
      })
      .subscribe();
});

const sendMessage = async () => {
  lobbyStore.addChatMessage(chatMessage.value, LOBBY_ID);
}

</script>


<template>
  <UContainer class="flex flex-row gap-3">
    <div class="w-1/3 max-w-[280px]">
      <UTabs :items="[{ label: 'Users' }, { label: 'Games' }]">
        <template #item="{ item }">
          <UCard class="min-h-[500px] overflow-y-auto overflow-scroll">
            <template v-if="item.label === 'Users'">
              <ul class="space-y-5">
                <li v-for="user in onlineUsers" :key="user.id" class="relative w-full flex flex-row items-center">
                  <UAvatar :src="user.avatar_url || '#'" :alt="user.username" class="" />
                  <span class="ml-3">{{ user?.username }}</span>
                  <!-- <span class="pl-2 text-xs text-muted">{{ user?.status }}</span> -->
                   <!-- TODO: add game invite to users -->
                  <!-- <UButton variant="ghost" icon="i-fa6-solid-chess-board" class="right-0 absolute"/> -->
                </li>
              </ul>
              </template>
              <template v-else-if="item.label === 'Games'">
                <ul class="space-y-5">
                  <li v-for="game in openGames" :key="game.id" class="relative w-full flex flex-row items-center">
                    <UIcon class="text-2xl" name="i-fluent-chess-20-regular"/>
                    
                    <span class="pl-2 text-xs text-zinc-300">{{ game?.status }}</span>
                    <UButton label="Join" class="right-0 absolute"/>
                    <!-- TODO: Add spectator option -->
                  </li>
                </ul>
              </template>
          </UCard>
        </template>
      </UTabs>
    </div>
    <div id="wrapper" class="h-dvh pb-[150px] w-1/2 relative">
      <div class="h-full overflow-clip flex sm:flex-row">


        <div id="chat-box"
          class="border border-primary border-b-0 w-full dark:bg-zinc-800 bg-zinc-200 flex flex-col justify-end px-4">
          <template v-for="(msg, index) in messages" :key="index">

            <div class="">
              <span class="text-xs">{{ new Date(msg?.created_at).toLocaleTimeString() }}</span>
              <span :class="`font-bold ${msg?.user_id === currentUser?.id ? 'dark:text-purple-500 text-purple-600' : 'dark:text-blue-500 text-blue-600'} p-1`">{{ msg?.username }}</span>:<span class="px-2 text-lg">{{ msg?.message }}</span>
            </div>
          </template>
          

        </div>


      </div>

      <form @submit.prevent="sendMessage" class="w-full flex">
        <UInput v-model="chatMessage" size="lg" variant="outline" class="grow rounded-none border border-primary border-t-0"  />
        <UButton type="submit" size="lg" trailing-icon="i-tdesign-send" class="shrink rounded-none" label="send" />
      </form>
    </div>
    <CreateGame :user-list="onlineUsers" />
    
  </UContainer>
</template>
