import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Subject } from '@/types'

const STORAGE_KEY = 'checkin_subjects'

const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: 'default-ruankao',
    name: '计算机技术与软件专业技术资格',
    icon: '💻',
    color: '#6366f1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'default-shiyebian',
    name: '浙江省杭州市事业编考试',
    icon: '📝',
    color: '#0ea5e9',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'default-ai-agent',
    name: 'AI-Agent学习:vibecoding',
    icon: '🤖',
    color: '#8b5cf6',
    createdAt: new Date().toISOString(),
  },
]

export const useSubjectsStore = defineStore('subjects', () => {
  const subjects = ref<Subject[]>(load())

  function load(): Subject[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUBJECTS))
      return [...DEFAULT_SUBJECTS]
    }
    try {
      return JSON.parse(raw)
    } catch {
      return [...DEFAULT_SUBJECTS]
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects.value))
  }

  function add(subject: Omit<Subject, 'id' | 'createdAt'>) {
    subjects.value.push({
      ...subject,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    })
    save()
  }

  function update(id: string, payload: Partial<Omit<Subject, 'id' | 'createdAt'>>) {
    const idx = subjects.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      subjects.value[idx] = { ...subjects.value[idx], ...payload }
      save()
    }
  }

  function remove(id: string) {
    subjects.value = subjects.value.filter(s => s.id !== id)
    save()
  }

  return { subjects, add, update, remove }
})
