import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../auth.store'

const STORAGE_KEY = 'cinema::auth::token'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.localStorage.clear()
  })

  it('initializes token from storage', () => {
    window.localStorage.setItem(STORAGE_KEY, 'token-1')
    const store = useAuthStore()

    expect(store.token).toBe('token-1')
    expect(store.isAuthenticated).toBe(true)
  })

  it('sets auth token and persists it', () => {
    const store = useAuthStore()

    store.setAuthToken('token-2')

    expect(store.token).toBe('token-2')
    expect(store.isAuthenticated).toBe(true)
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('token-2')
  })

  it('clears auth data', () => {
    const store = useAuthStore()
    store.setAuthToken('token-3')
    store.setUsername('user')

    store.clearAuth()

    expect(store.token).toBe(null)
    expect(store.username).toBe(null)
    expect(store.isAuthenticated).toBe(false)
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(null)
  })
})
