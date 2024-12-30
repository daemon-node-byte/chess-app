<script lang="ts" setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import type { BoardApi, BoardConfig } from 'vue3-chessboard';

const boardAPI = ref<BoardApi | null>(null);

function checkForEnd () {
  if (boardAPI.value) {
    console.log('change', boardAPI.value.getTurnColor());
  }
}

const boardConfig: BoardConfig = {
  coordinates: true,
  events: {
    change: () => {
      if (boardAPI.value) {
        console.log('change', boardAPI.value.getTurnColor());
        checkForEnd();

      }
    },
    move: (from, to, capture) => {
      console.log('move', from, to, capture);
    }, select: (key) => {
      console.log('select', key);
    }
  }
};
</script>

<template>
  <div class="border flex flex-col md:flex-row">
    <div class="w-[400px] max-w-[420px] m-2 p-2 border border-gray-400 bg-gray-700">

    </div>
    <div class="border border-primary">

      <TheChessboard :board-config="boardConfig" @board-created="(api) => (boardAPI = api)" />
      <div class="space-x-3">
        
        <UButton label="chat"/>
        <UButton label="stats"/>
        <UButton label="pgn"/>
      </div>
      <div class="">
        <UButtonGroup>
          <UButton label="undo"/>
          <UButton label="reset"/>
          <UButton label="flip"/>
        </UButtonGroup>
      </div>
    </div>
  </div>
</template>

<style>
section.main-wrap {
  display: flex !important;
}
cg-board {
  background-image: url(/images/chess/2d/board/green-plastic.png) !important;
}
.white.pawn {
  background-image: url(/images/chess/2d/pieces/white-pawn.svg) !important;
}
.black.pawn {
  background-image: url(/images/chess/2d/pieces/black-pawn.svg) !important;
}
.white.rook {
  background-image: url(/images/chess/2d/pieces/white-rook.svg) !important;
}
.black.rook {
  background-image: url(/images/chess/2d/pieces/black-rook.svg) !important;
}
.white.knight {
  background-image: url(/images/chess/2d/pieces/white-knight.svg) !important;
}
.black.knight {
  background-image: url(/images/chess/2d/pieces/black-knight.svg) !important;
}
.white.bishop {
  background-image: url(/images/chess/2d/pieces/white-bishop.svg) !important;
}
.black.bishop {
  background-image: url(/images/chess/2d/pieces/black-bishop.svg) !important;
}
.white.bishop {
  background-image: url(/images/chess/2d/pieces/white-bishop.svg) !important;
}
.black.bishop {
  background-image: url(/images/chess/2d/pieces/black-bishop.svg) !important;
}
.white.queen {
  background-image: url(/images/chess/2d/pieces/white-queen.svg) !important;
}
.black.queen {
  background-image: url(/images/chess/2d/pieces/black-queen.svg) !important;
}
.white.king {
  background-image: url(/images/chess/2d/pieces/white-king.svg) !important;
}
.black.king {
  background-image: url(/images/chess/2d/pieces/black-king.svg) !important;
}
</style>