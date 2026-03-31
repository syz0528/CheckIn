<template>
  <el-dialog
    :model-value="visible"
    :title="isEdit ? '编辑科目' : '添加科目'"
    width="380px"
    @close="emit('update:visible', false)"
    :close-on-click-modal="false"
  >
    <el-form label-position="top" class="subject-form">
      <el-form-item label="科目名称">
        <el-input v-model="form.name" placeholder="如：英语" maxlength="20" />
      </el-form-item>

      <el-form-item label="图标（Emoji）">
        <div class="emoji-picker">
          <span
            v-for="e in emojiList"
            :key="e"
            class="emoji-option"
            :class="{ selected: form.icon === e }"
            @click="form.icon = e"
          >{{ e }}</span>
        </div>
      </el-form-item>

      <el-form-item label="主题颜色">
        <div class="color-picker">
          <span
            v-for="c in colorList"
            :key="c"
            class="color-option"
            :class="{ selected: form.color === c }"
            :style="{ background: c }"
            @click="form.color = c"
          />
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :disabled="!form.name.trim()">
        {{ isEdit ? '保存' : '添加' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Subject } from '@/types'

const props = defineProps<{
  visible: boolean
  editSubject?: Subject | null
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
  (e: 'submit', data: { name: string; icon: string; color: string }): void
}>()

const isEdit = !!props.editSubject

const emojiList = ['📖', '📝', '🧮', '🎨', '🏃', '💻', '🎵', '🌍', '🔬', '📐', '🧠', '✍️', '🎯', '🧘', '🗣️', '📚']
const colorList = ['#1e40af', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

const form = reactive({
  name: '',
  icon: '📖',
  color: '#1e40af',
})

watch(() => props.visible, (val) => {
  if (val && props.editSubject) {
    form.name = props.editSubject.name
    form.icon = props.editSubject.icon
    form.color = props.editSubject.color
  } else if (val) {
    form.name = ''
    form.icon = '📖'
    form.color = '#1e40af'
  }
})

function handleSubmit() {
  if (!form.name.trim()) return
  emit('submit', { name: form.name.trim(), icon: form.icon, color: form.color })
  emit('update:visible', false)
}
</script>

<style scoped>
.emoji-picker, .color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.emoji-option {
  font-size: 24px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: border-color 0.15s, background 0.15s;
}

.emoji-option:hover { background: #f1f5f9; }
.emoji-option.selected { border-color: #1e40af; background: #eff6ff; }

.color-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: border-color 0.15s, transform 0.15s;
}

.color-option:hover { transform: scale(1.15); }
.color-option.selected { border-color: #1e293b; }
</style>
