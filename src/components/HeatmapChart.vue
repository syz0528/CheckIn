<template>
  <div class="heatmap-wrapper">
    <div class="heatmap-title">打卡热图（近 90 天）</div>
    <div class="heatmap-grid">
      <el-tooltip
        v-for="day in data"
        :key="day.date"
        :content="`${day.date}：${day.count} 次打卡`"
        placement="top"
        :show-after="200"
      >
        <div
          class="heatmap-cell"
          :style="{ background: getColor(day.count) }"
        />
      </el-tooltip>
    </div>
    <div class="heatmap-legend">
      <span class="legend-label">少</span>
      <div class="legend-cell" :style="{ background: '#eef2ff' }" />
      <div class="legend-cell" :style="{ background: '#c7d2fe' }" />
      <div class="legend-cell" :style="{ background: '#818cf8' }" />
      <div class="legend-cell" :style="{ background: '#6366f1' }" />
      <span class="legend-label">多</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: { date: string; count: number }[]
}>()

function getColor(count: number): string {
  if (count === 0) return '#eef2ff'
  if (count === 1) return '#c7d2fe'
  if (count === 2) return '#818cf8'
  return '#6366f1'
}
</script>

<style scoped>
.heatmap-wrapper {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03), 0 4px 18px rgba(0,0,0,0.02);
}

.heatmap-title {
  font-size: 16px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 16px;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 5px;
}

.heatmap-cell {
  aspect-ratio: 1;
  border-radius: 4px;
  min-width: 0;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.15s ease;
}

.heatmap-cell:hover {
  transform: scale(1.4);
  box-shadow: 0 2px 8px rgba(99,102,241,0.2);
}

.heatmap-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  margin-top: 14px;
}

.legend-cell {
  width: 14px;
  height: 14px;
  border-radius: 3px;
}

.legend-label {
  font-size: 11px;
  color: #94a3b8;
}
</style>
