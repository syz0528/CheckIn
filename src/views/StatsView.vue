<template>
  <div class="stats-view">
    <header class="page-header">
      <h1 class="page-title">数据统计</h1>
    </header>

    <template v-if="hasData">
      <StatsCards
        :total-days="totalDays"
        :total-checkins="totalCheckins"
        :longest-streak="longestStreak"
        :week-rate="weekCompletionRate"
      />

      <div class="section-gap" />

      <HeatmapChart :data="heatmapData" />
    </template>

    <div v-else class="empty-state">
      <div class="empty-icon">📊</div>
      <p class="empty-title">暂无数据</p>
      <p class="empty-desc">完成你的第一次打卡后，这里会展示你的学习统计</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStats } from '@/composables/useStats'
import { useCheckInsStore } from '@/stores/checkins'
import StatsCards from '@/components/StatsCards.vue'
import HeatmapChart from '@/components/HeatmapChart.vue'

const checkInsStore = useCheckInsStore()
const { totalDays, totalCheckins, longestStreak, weekCompletionRate, heatmapData } = useStats()

const hasData = computed(() => checkInsStore.records.length > 0)
</script>

<style scoped>
.stats-view {
  max-width: 620px;
  margin: 0 auto;
  padding: 28px 16px;
}

.page-header {
  margin-bottom: 26px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #4f46e5, #6366f1, #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-gap {
  height: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon { font-size: 56px; margin-bottom: 16px; }
.empty-title { font-size: 20px; font-weight: 700; color: #334155; }
.empty-desc { font-size: 14px; color: #94a3b8; margin-top: 8px; }
</style>
