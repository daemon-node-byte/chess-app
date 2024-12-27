<script lang="ts" setup>
const isLoading = ref<null | boolean>(null)
const supabase = useSupabaseClient()
const lobbyList = ref<{id: string, name: string}[]>([])
  onMounted(async () => {
    isLoading.value = true;
    try {
      const { data, error } = await supabase.from('lobby').select('*')
      if (error) {
        throw createError(`failed to load lobby list ${error}`)
      }
      if (data) {
        lobbyList.value = data;
        isLoading.value = false;
      }
    } catch (error) {
      console.error(error)
      throw createError(`failed to load ${error}`)
    }

  })
</script>
<template>
  <div class="flex justify-center items-center w-full h-dvh -mt-[80px]">

    <UCard class="w-[350px] text-center">
      <template #header>
        <h1 class="text-2xl font-bold">Lobby List</h1>
      </template>
      <ul class="space-y-4 text-center">
        <li v-for="lobby in lobbyList" :key="lobby.id">
          <UButton as="link" size="lg" block variant="ghost" color="primary" class="hover:text-gray-400 dark:hover:text-gray-300 font-bold text-2xl" :to="`/lobby/${lobby.id}`">{{ lobby.name }}</UButton>
        </li>
      </ul>
    </UCard>
  </div>
</template>