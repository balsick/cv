import CV from '../components/CV.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: CV },
  { path: '/pdf', component: CV }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
