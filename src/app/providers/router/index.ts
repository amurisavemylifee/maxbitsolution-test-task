import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { registerRouterGuards } from './guards'

export function createAppRouter() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  registerRouterGuards(router)
  return router
}
