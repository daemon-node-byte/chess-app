<script setup lang="ts">
defineProps<{roomId: string | undefined}>()

const { messages, sendMessage } = useChat(roomId)
const user = useSupabaseUser()

const currentMessage = ref('')

function onSend() {
  if (!currentMessage.value.trim()) return
  sendMessage(currentMessage.value, user.value?.id || 'Anonymous')
  currentMessage.value = ''
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg.userId }}: {{ msg.text }}
      </li>
    </ul>
    <input v-model="currentMessage" @keyup.enter="onSend" >
  </div>
</template>
