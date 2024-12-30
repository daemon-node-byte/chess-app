<script lang="ts" setup>
import { ChessGame, getPieceIconName, getColorClassName } from '~/utils/chess.utils'
import type { BoardType } from '~/types/game.types'

const tiles = ref<BoardType | null>(null)

const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

onMounted(() => {
 const chessGame = new ChessGame()
  tiles.value = chessGame.getPosition()
  console.log('tiles', tiles.value)
})


</script>
<template>
  <div class="flex">

    <div class="grid grid-cols-8">
      <template v-for="(rank, i) in ranks" :key="rank">
        <template v-for="(file, j) in files" :key="file">
          <div :class="`relative flex justify-center items-center w-24 h-24 ${(i + j) % 2 !== 0 ? 'bg-primary-700 text-gray-200' : 'bg-gray-200 text-primary-700'}`" >
            <span class="absolute text-sm right-0 bottom-0 p-1">{{ file+rank }}</span>
            <template v-if="tiles && tiles[i][j]?.square === file+rank">
              {{ console.log('~~~~~~~~~~~~~~~~~~~~', tiles[i][j].square) }}
              <UIcon mode="svg" :name="getPieceIconName(tiles[i][j].type)" :class="`${getColorClassName(tiles[i][j].color)} text-6xl`" />
            </template>
          </div> 
        </template>
      </template>
    </div>
  </div>
</template>