<template>
  <div class="home-view">
    <header class="page-header">
      <h1 class="page-title">今日打卡</h1>
      <p class="page-date">{{ todayLabel }}</p>
    </header>

    <transition name="fade">
      <div v-if="allDone && subjects.length > 0" class="all-done-banner bounce-in">
        <span class="banner-emoji">🎉</span>
        今日全部完成！太棒了！
      </div>
    </transition>

    <div v-if="subjects.length > 0" class="card-list">
      <CheckInCard
        v-for="sub in subjects"
        :key="sub.id"
        :subject="sub"
        @toggled="onToggled"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📝</div>
      <p class="empty-title">还没有学习科目</p>
      <p class="empty-desc">去「科目管理」添加你想打卡的科目吧</p>
      <router-link to="/subjects" class="btn-primary" style="display:inline-block;margin-top:18px;">
        添加科目
      </router-link>
    </div>

    <ConfettiEffect ref="confettiRef" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useSubjectsStore } from '@/stores/subjects'
import { useCheckInsStore } from '@/stores/checkins'
import CheckInCard from '@/components/CheckInCard.vue'
import ConfettiEffect from '@/components/ConfettiEffect.vue'

const subjectsStore = useSubjectsStore()
const checkInsStore = useCheckInsStore()
const confettiRef = ref<InstanceType<typeof ConfettiEffect> | null>(null)

const subjects = computed(() => subjectsStore.subjects)
const todayLabel = dayjs().locale('zh-cn').format('YYYY 年 M 月 D 日 dddd')

const allDone = computed(() => {
  if (subjects.value.length === 0) return false
  return subjects.value.every(s => checkInsStore.isCheckedIn(s.id))
})

let prevAllDone = false

watch(allDone, (val) => {
  if (val && !prevAllDone) {
    confettiRef.value?.fire()
  }
  prevAllDone = val
})

function onToggled(_checked: boolean) {
  // 交互音效等可在此扩展
}
</script>

<style scoped>
.home-view {
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

.page-date {
  font-size: 14px;
  color: #94a3b8;
  margin-top: 6px;
}

.all-done-banner {
  background: linear-gradient(135deg, #6366f1, #818cf8, #0ea5e9);
  color: #fff;
  border-radius: 18px;
  padding: 18px 24px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 22px;
  box-shadow: 0 4px 20px rgba(99,102,241,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.banner-emoji { font-size: 22px; }

.card-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon { font-size: 56px; margin-bottom: 16px; }
.empty-title { font-size: 20px; font-weight: 700; color: #334155; }
.empty-desc { font-size: 14px; color: #94a3b8; margin-top: 8px; }

.bounce-in { animation: bounce-in 0.4s ease both; }

@keyframes bounce-in {
  0% { transform: scale(0.85); opacity: 0; }
  55% { transform: scale(1.04); }
  100% { transform: scale(1); opacity: 1; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
