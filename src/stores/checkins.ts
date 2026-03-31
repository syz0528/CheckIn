import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import type { CheckIn } from '@/types'

const STORAGE_KEY = 'checkin_records'

export const useCheckInsStore = defineStore('checkins', () => {
  const records = ref<CheckIn[]>(load())

  function load(): CheckIn[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.value))
  }

  const today = computed(() => dayjs().format('YYYY-MM-DD'))

  function isCheckedIn(subjectId: string, date?: string): boolean {
    const d = date ?? today.value
    return records.value.some(r => r.subjectId === subjectId && r.date === d)
  }

  function toggle(subjectId: string, note?: string) {
    if (isCheckedIn(subjectId)) {
      records.value = records.value.filter(
        r => !(r.subjectId === subjectId && r.date === today.value)
      )
    } else {
      records.value.push({
        id: crypto.randomUUID(),
        subjectId,
        date: today.value,
        note,
      })
    }
    save()
  }

  function getStreak(subjectId: string): number {
    let count = 0
    let day = dayjs()
    // if not checked in today, start from yesterday
    if (!isCheckedIn(subjectId, day.format('YYYY-MM-DD'))) {
      day = day.subtract(1, 'day')
    }
    while (isCheckedIn(subjectId, day.format('YYYY-MM-DD'))) {
      count++
      day = day.subtract(1, 'day')
    }
    return count
  }

  function getRecordsForDate(date: string): CheckIn[] {
    return records.value.filter(r => r.date === date)
  }

  function removeBySubject(subjectId: string) {
    records.value = records.value.filter(r => r.subjectId !== subjectId)
    save()
  }

  return { records, today, isCheckedIn, toggle, getStreak, getRecordsForDate, removeBySubject }
})
