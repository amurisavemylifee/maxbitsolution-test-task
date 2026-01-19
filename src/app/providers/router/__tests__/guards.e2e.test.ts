import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { routes } from '../routes'
import { registerRouterGuards } from '../guards'
import { useAuthStore } from '@/entities/auth'

describe('router guards e2e', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('redirects unauthenticated user to login with redirect query', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    registerRouterGuards(router)

    await router.push('/tickets')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/tickets')
  })

  it('redirects authenticated user away from auth pages', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    registerRouterGuards(router)

    const authStore = useAuthStore()
    authStore.setAuthToken('token')

    await router.push('/auth/login')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('tickets')
  })
})
