import { computed } from 'vue'
import dayjs from 'dayjs'
import { useCheckInsStore } from '@/stores/checkins'
import { useSubjectsStore } from '@/stores/subjects'

export function useStats() {
  const checkInsStore = useCheckInsStore()
  const subjectsStore = useSubjectsStore()

  const totalDays = computed(() => {
    const dates = new Set(checkInsStore.records.map(r => r.date))
    return dates.size
  })

  const totalCheckins = computed(() => checkInsStore.records.length)

  const longestStreak = computed(() => {
    if (checkInsStore.records.length === 0) return 0
    const dates = [...new Set(checkInsStore.records.map(r => r.date))].sort()
    let max = 1, cur = 1
    for (let i = 1; i < dates.length; i++) {
      const diff = dayjs(dates[i]).diff(dayjs(dates[i - 1]), 'day')
      if (diff === 1) {
        cur++
        max = Math.max(max, cur)
      } else if (diff > 1) {
        cur = 1
      }
    }
    return max
  })

  const weekCompletionRate = computed(() => {
    const total = subjectsStore.subjects.length
    if (total === 0) return 0
    const weekDays: string[] = []
    for (let i = 6; i >= 0; i--) {
      weekDays.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'))
    }
    let checked = 0
    for (const day of weekDays) {
      const count = checkInsStore.records.filter(r => r.date === day).length
      if (count > 0) checked++
    }
    return Math.round((checked / 7) * 100)
  })

  const heatmapData = computed(() => {
    const result: { date: string; count: number }[] = []
    for (let i = 89; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD')
      const count = checkInsStore.records.filter(r => r.date === date).length
      result.push({ date, count })
    }
    return result
  })

  return { totalDays, totalCheckins, longestStreak, weekCompletionRate, heatmapData }
}
