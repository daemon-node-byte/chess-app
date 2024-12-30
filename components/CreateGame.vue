<script lang="ts" setup>
import type { UserProfile } from '~/types/index'
type Props = {
  userList: UserProfile[] | null;
}
const props = defineProps<Props>()
const gameVariants = [{
  label: 'Standard',
  value: 'standard',
  disabled: false,
}, {
  label: 'Chess960',
  value: 'chess960',
  disabled: true,
}, {
  label: 'King of the Hill',
  value: 'kingOfTheHill',
  disabled: true,
}, {
  label: 'Three-check',
  value: 'threeCheck',
  disabled: true,
}, {
  label: 'Antichess',
  value: 'antichess',
  disabled: true,
}, {
  label: 'Atomic',
  value: 'atomic',
  disabled: true,
}, {
  label: 'Horde',
  value: 'horde',
  disabled: true,
}, {
  label: 'Racing Kings',
  value: 'racingKings',
  disabled: true,
}, {
  label: 'Crazyhouse',
  value: 'crazyhouse',
  disabled: true,
}, {
  label: 'From Position',
  value: 'fromPosition',
  disabled: true,
}, {
  label: '5d Chess with Multiverse Time Travel',
  value: '5dChess',
  disabled: true,
}]
const botPlayers = [{
  label: 'Open to join',
  value: 'open',
  disabled: false,
}, {
  label: 'Stockfish',
  value: 'stockfish',
  disabled: true,
}, {
  label: 'Leela Chess Zero',
  value: 'lc0',
  disabled: true,
}, {
  label: 'Komodo',
  value: 'komodo',
  disabled: true,
}, {
  label: 'Houdini',
  value: 'houdini',
  disabled: true,
}, {
  label: 'Fire',
  value: 'fire',
  disabled: true,
}, {
  label: 'Rybka',
  value: 'rybka',
  disabled: true,
}, {
  label: 'Fritz',
  value: 'fritz',
  disabled: true,
}, {
  label: 'Crafty',
  value: 'crafty',
  disabled: true,
}, {
  label: 'Gnu Chess',
  value: 'gnuchess',
  disabled: true,
}, {
  label: 'Sjeng',
  value: 'sjeng',
  disabled: true,
}]
const gameTypeVariant = ref('')
const hostSide = ref('random')
const isRated = ref(false)
const isTimed = ref(false)
const isPrivate = ref(false)
const gameMinutes = ref(5)
const bonusSeconds = ref(0)
const gameOpponent = ref('')
const opponentList = ref<{ label: string; value: string; disabled: boolean}[]>([])
onMounted(() => {
  if (props.userList) {
    opponentList.value = props.userList.map((user) =>{
      return {
        label: user.username,
        value: user.id,
        disabled: false
      }
    })
  }
  opponentList.value.unshift(...botPlayers)
})
</script>

<template>
  <div class="w-[400px] h-[650px] p-4">
    <h3 class="">Game Settings</h3>
    <div class="my-4 space-y-2">

      <p>Opponent</p>
      <USelect v-model="gameOpponent" :options="opponentList" placeholder="Challenge player..." padded size="lg" />
      <p>Game Type</p>
      <USelect v-model="gameTypeVariant" :options="gameVariants" placeholder="Select variant..." padded size="lg" /> 
    </div>
      <div class="flex">
        <div class="space-y-4 mb-6 w-1/2">
          <URadioGroup
          v-model="hostSide"
          legend="Pick side"
          :options="[{ value: 'white', label: 'White' }, { value: 'black', label: 'Black' }, { value: 'random', label: 'Random' }]"
          />
        </div>
<div class="mb-3">
<div class="flex items-center py-2">
  <UToggle v-model="isRated" size="md" on-icon="i-material-symbols-check" off-icon="i-iconamoon-sign-times" />
  <span class="pl-2 text-xs">Rated Game</span>
</div>
<div class="flex items-center py-2">
  <UToggle v-model="isTimed" size="md" on-icon="i-material-symbols-check" off-icon="i-iconamoon-sign-times" />
  <span class="pl-2 text-xs">Chess Clock</span>
</div>
<div class="flex items-center py-2">
  <UToggle v-model="isPrivate" size="md" on-icon="i-material-symbols-check" off-icon="i-iconamoon-sign-times" />
  <span class="pl-2 text-xs">Private Game</span>
</div>
</div>
    </div>
    <div :class="`${!isTimed && 'opacity-50 transition-all ease-in'} p-4 border mb-4 space-y-4`">
      <span class="text-lg font-bold">Time Control</span>
      <template v-if="isTimed">
        <span class="pl-6 text-sm">{{ gameMinutes }} min, +{{ bonusSeconds }} sec bonus </span>
      </template>
      <template v-else>
        <span class="pl-20 text-sm">Disabled</span>
      </template>
        <p>Minutes</p>
        <URange v-model="gameMinutes" :min="1" :max="30" />
        <p>Bonus Seconds</p>
        <URange v-model="bonusSeconds" :min="0" :max="30" />
      </div>
    <UButton label="Start Game" block size="lg" />
  </div>
</template>