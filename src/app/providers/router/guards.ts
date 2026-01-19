import type { Router } from 'vue-router'
import { useAuthStore } from '@/entities/auth'

export function registerRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return next({
        name: 'login',
        query: { redirect: to.fullPath },
      })
    }

    if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
      return next({ name: 'tickets' })
    }

    next()
  })
}
