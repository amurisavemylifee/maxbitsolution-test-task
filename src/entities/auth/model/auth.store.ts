import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { setTokenProvider } from '@/shared/api'
import { readFromStorage, removeFromStorage, saveToStorage } from '@/shared/utils/storage'

const STORAGE_KEY = 'cinema::auth::token'

// WARN: в будущем лучше попросить backend отправлять токен в HttpOnly cookie с Secure флагом, для устранения XSS атаки
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(readFromStorage(STORAGE_KEY))
  const username = ref<string | null>(null)

  setTokenProvider(() => token.value)

  const isAuthenticated = computed(() => Boolean(token.value))

  function setAuthToken(value: string) {
    token.value = value
    saveToStorage(STORAGE_KEY, value)
  }

  function setUsername(value: string | null) {
    username.value = value
  }

  function clearAuth() {
    token.value = null
    username.value = null
    removeFromStorage(STORAGE_KEY)
  }

  return {
    token,
    username,
    isAuthenticated,
    setAuthToken,
    setUsername,
    clearAuth,
  }
})
