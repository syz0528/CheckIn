<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <span class="logo-icon">📚</span>
        <span class="logo-text">每日打卡</span>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }">
          <span class="nav-icon">🏠</span>
          <span>今日打卡</span>
        </router-link>
        <router-link to="/stats" class="nav-item" :class="{ active: route.path === '/stats' }">
          <span class="nav-icon">📊</span>
          <span>数据统计</span>
        </router-link>
        <router-link to="/subjects" class="nav-item" :class="{ active: route.path === '/subjects' }">
          <span class="nav-icon">⚙️</span>
          <span>科目管理</span>
        </router-link>
      </nav>
    </aside>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <nav class="bottom-nav">
      <router-link to="/" class="bottom-nav-item" :class="{ active: route.path === '/' }">
        <span class="bottom-nav-icon">🏠</span>
        <span class="bottom-nav-label">打卡</span>
      </router-link>
      <router-link to="/stats" class="bottom-nav-item" :class="{ active: route.path === '/stats' }">
        <span class="bottom-nav-icon">📊</span>
        <span class="bottom-nav-label">统计</span>
      </router-link>
      <router-link to="/subjects" class="bottom-nav-item" :class="{ active: route.path === '/subjects' }">
        <span class="bottom-nav-icon">⚙️</span>
        <span class="bottom-nav-label">科目</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  display: none;
  width: 230px;
  min-height: 100vh;
  background: linear-gradient(180deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%);
  flex-direction: column;
  padding: 28px 18px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px 32px;
  color: #fff;
}

.logo-icon { font-size: 28px; }
.logo-text { font-size: 19px; font-weight: 700; letter-spacing: 1px; }

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 18px;
  border-radius: 14px;
  color: rgba(255,255,255,0.72);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.25s ease;
}

.nav-item:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}

.nav-item.active {
  background: rgba(255,255,255,0.22);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.nav-icon { font-size: 20px; }

.main-content {
  flex: 1;
  padding: 0 0 80px;
  min-height: 100vh;
  width: 100%;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 66px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(226,232,240,0.6);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
}

.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: #94a3b8;
  flex: 1;
  padding: 8px 0;
  transition: color 0.25s;
}

.bottom-nav-item.active {
  color: #6366f1;
}

.bottom-nav-icon { font-size: 22px; }
.bottom-nav-label { font-size: 11px; font-weight: 600; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (min-width: 768px) {
  .sidebar { display: flex; }
  .main-content { margin-left: 230px; padding-bottom: 0; }
  .bottom-nav { display: none; }
}
</style>
