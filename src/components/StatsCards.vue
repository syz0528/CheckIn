<template>
  <div class="stats-grid">
    <div class="stat-card" v-for="item in cards" :key="item.label">
      <div class="stat-icon">{{ item.icon }}</div>
      <div class="stat-value">{{ item.value }}</div>
      <div class="stat-label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalDays: number
  totalCheckins: number
  longestStreak: number
  weekRate: number
}>()

const cards = computed(() => [
  { icon: '📅', value: props.totalDays, label: '打卡天数' },
  { icon: '✅', value: props.totalCheckins, label: '总打卡次数' },
  { icon: '🔥', value: props.longestStreak, label: '最长连续' },
  { icon: '📈', value: `${props.weekRate}%`, label: '本周完成率' },
])
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.stat-card {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 22px 16px 18px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03), 0 4px 18px rgba(0,0,0,0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #6366f1, #0ea5e9, #8b5cf6);
  border-radius: 18px 18px 0 0;
  opacity: 0.6;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
}

.stat-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 30px;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.stat-label {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 6px;
  font-weight: 500;
}
</style>
