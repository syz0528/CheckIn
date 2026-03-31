<template>
  <div class="subjects-view">
    <header class="page-header">
      <h1 class="page-title">科目管理</h1>
      <el-button type="primary" round @click="openAdd">+ 添加科目</el-button>
    </header>

    <div v-if="subjects.length > 0" class="subject-list">
      <div
        v-for="sub in subjects"
        :key="sub.id"
        class="subject-item"
        :style="{ borderLeftColor: sub.color }"
      >
        <div class="item-left">
          <div class="item-icon-wrap" :style="{ background: `${sub.color}15` }">
            <span class="item-icon">{{ sub.icon }}</span>
          </div>
          <div class="item-info">
            <div class="item-name">{{ sub.name }}</div>
            <div class="item-date">创建于 {{ formatDate(sub.createdAt) }}</div>
          </div>
        </div>
        <div class="item-actions">
          <el-button text @click="openEdit(sub)">编辑</el-button>
          <el-button text type="danger" @click="handleDelete(sub)">删除</el-button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📋</div>
      <p class="empty-title">暂无科目</p>
      <p class="empty-desc">点击上方按钮添加你的第一个学习科目</p>
    </div>

    <SubjectDialog
      v-model:visible="dialogVisible"
      :edit-subject="editingSubject"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useSubjectsStore } from '@/stores/subjects'
import { useCheckInsStore } from '@/stores/checkins'
import SubjectDialog from '@/components/SubjectDialog.vue'
import type { Subject } from '@/types'

const subjectsStore = useSubjectsStore()
const checkInsStore = useCheckInsStore()

const subjects = computed(() => subjectsStore.subjects)

const dialogVisible = ref(false)
const editingSubject = ref<Subject | null>(null)

function openAdd() {
  editingSubject.value = null
  dialogVisible.value = true
}

function openEdit(sub: Subject) {
  editingSubject.value = sub
  dialogVisible.value = true
}

function handleSubmit(data: { name: string; icon: string; color: string }) {
  if (editingSubject.value) {
    subjectsStore.update(editingSubject.value.id, data)
    ElMessage.success('科目已更新')
  } else {
    subjectsStore.add(data)
    ElMessage.success('科目已添加')
  }
}

async function handleDelete(sub: Subject) {
  try {
    await ElMessageBox.confirm(
      `确定要删除「${sub.icon} ${sub.name}」吗？相关打卡记录也会一并删除。`,
      '删除确认',
      { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
    )
    checkInsStore.removeBySubject(sub.id)
    subjectsStore.remove(sub.id)
    ElMessage.success('已删除')
  } catch {
    // cancelled
  }
}

function formatDate(iso: string) {
  return dayjs(iso).format('YYYY-MM-DD')
}
</script>

<style scoped>
.subjects-view {
  max-width: 620px;
  margin: 0 auto;
  padding: 28px 16px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.subject-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.subject-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  padding: 18px 20px;
  border-left: 4px solid #ccc;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03), 0 4px 18px rgba(0,0,0,0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.subject-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
}

.item-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.item-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-icon { font-size: 24px; }

.item-info { min-width: 0; }

.item-name {
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  word-break: break-all;
}

.item-date {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 3px;
}

.item-actions {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon { font-size: 56px; margin-bottom: 16px; }
.empty-title { font-size: 20px; font-weight: 700; color: #334155; }
.empty-desc { font-size: 14px; color: #94a3b8; margin-top: 8px; }
</style>
