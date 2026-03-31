import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StatsView from '@/views/StatsView.vue'
import SubjectsView from '@/views/SubjectsView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/stats', component: StatsView },
    { path: '/subjects', component: SubjectsView },
  ],
})
