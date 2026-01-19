import { ref } from 'vue'
import type { SessionDto } from './session.types'
import { normalizeApiError } from '@/shared/api/normalizeApiError'
import { fetchMovieSessions } from '@/entities/movie'
import { fetchCinemaSessions } from '@/entities/cinema'

const sessionCache = ref<Record<number, SessionDto>>({})
const loading = ref(false)
const error = ref<string | null>(null)

export function useSessionLookup() {
  async function loadSessionsForMovie(movieId: number) {
    loading.value = true
    error.value = null

    try {
      const sessions = await fetchMovieSessions(movieId)
      sessions.forEach((session) => {
        sessionCache.value[session.id] = session
      })
    } catch (err) {
      const normalized = normalizeApiError(err)
      error.value = normalized.payload?.message ?? 'Не удалось загрузить сеансы'
    } finally {
      loading.value = false
    }
  }

  async function loadSessionsForCinema(cinemaId: number) {
    loading.value = true
    error.value = null

    try {
      const sessions = await fetchCinemaSessions(cinemaId)
      sessions.forEach((session) => {
        sessionCache.value[session.id] = session
      })
    } catch (err) {
      const normalized = normalizeApiError(err)
      error.value = normalized.payload?.message ?? 'Не удалось загрузить сеансы'
    } finally {
      loading.value = false
    }
  }

  return {
    cache: sessionCache,
    loading,
    error,
    loadSessionsForMovie,
    loadSessionsForCinema,
  }
}
