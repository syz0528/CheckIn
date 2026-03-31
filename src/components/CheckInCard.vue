<template>
  <div
    class="checkin-card"
    :class="{ checked: isChecked, 'pop-anim': justChecked }"
    :style="cardStyle"
    @click="handleToggle"
  >
    <div class="card-left">
      <div class="card-icon-wrap" :style="{ background: iconBg }">
        <span class="card-icon">{{ subject.icon }}</span>
      </div>
      <div class="card-info">
        <div class="card-name">{{ subject.name }}</div>
        <div class="card-streak">
          <span class="streak-fire">🔥</span> 连续 {{ streak }} 天
        </div>
      </div>
    </div>
    <div class="card-right">
      <transition name="check-pop">
        <div v-if="isChecked" class="check-mark" :style="{ background: checkGradient }">✓</div>
        <div v-else class="check-empty" />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Subject } from '@/types'
import { useCheckInsStore } from '@/stores/checkins'

const props = defineProps<{ subject: Subject }>()
const emit = defineEmits<{ (e: 'toggled', checked: boolean): void }>()

const store = useCheckInsStore()
const justChecked = ref(false)

const isChecked = computed(() => store.isCheckedIn(props.subject.id))
const streak = computed(() => store.getStreak(props.subject.id))

const iconBg = computed(() => `${props.subject.color}18`)
const checkGradient = computed(() =>
  `linear-gradient(135deg, ${props.subject.color}, ${props.subject.color}cc)`
)
const cardStyle = computed(() => {
  const c = props.subject.color
  return isChecked.value
    ? { background: `linear-gradient(135deg, ${c}08, ${c}12)`, borderLeftColor: c }
    : { borderLeftColor: c }
})

function handleToggle() {
  const wasChecked = isChecked.value
  store.toggle(props.subject.id)
  if (!wasChecked) {
    justChecked.value = true
    setTimeout(() => (justChecked.value = false), 450)
  }
  emit('toggled', !wasChecked)
}
</script>

<style scoped>
.checkin-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 18px 20px;
  border-left: 4px solid #ccc;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.025);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.3s ease;
  user-select: none;
}

.checkin-card:hover {
  box-shadow: 0 6px 28px rgba(0,0,0,0.07);
  transform: translateY(-1px);
}

.checkin-card:active {
  transform: scale(0.985);
}

.checkin-card.pop-anim {
  animation: card-pop 0.4s ease;
}

@keyframes card-pop {
  0% { transform: scale(1); }
  35% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

.card-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon {
  font-size: 26px;
  line-height: 1;
}

.card-info {
  min-width: 0;
}

.card-name {
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  line-height: 1.4;
  word-break: break-all;
}

.card-streak {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.streak-fire { font-size: 14px; }

.card-right {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 12px;
}

.check-mark {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  animation: check-pop 0.35s ease;
  box-shadow: 0 2px 8px rgba(99,102,241,0.25);
}

@keyframes check-pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.check-empty {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2.5px solid #d4d8e8;
  background: rgba(255,255,255,0.6);
  transition: border-color 0.2s;
}

.checkin-card:hover .check-empty {
  border-color: #a5b4fc;
}

.check-pop-enter-active { animation: check-pop 0.35s ease; }
.check-pop-leave-active { transition: opacity 0.15s; }
.check-pop-leave-to { opacity: 0; }
</style>
