<template>
  <canvas ref="canvasRef" class="confetti-canvas" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import confetti from 'canvas-confetti'

const canvasRef = ref<HTMLCanvasElement | null>(null)

function fire() {
  if (!canvasRef.value) return
  const myConfetti = confetti.create(canvasRef.value, { resize: true, useWorker: true })
  myConfetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.5 },
    colors: ['#6366f1', '#818cf8', '#0ea5e9', '#8b5cf6', '#a78bfa', '#34d399', '#fbbf24'],
  })
}

defineExpose({ fire })
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
</style>
