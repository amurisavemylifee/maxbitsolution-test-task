import { onMounted, ref } from 'vue'
import { normalizeApiError } from '@/shared/api/normalizeApiError'
import { fetchCinemaById, fetchCinemas, fetchCinemaSessions } from '../api/cinema.api'
import type { CinemaDto, CinemaSessionDto } from './cinema.types'

const cinemasState = {
  data: ref<CinemaDto[]>([]),
  isLoading: ref(false),
  error: ref<string | null>(null),
  initialized: ref(false),
}

export function useCinemas() {
  async function loadCinemas(force = false) {
    if (cinemasState.isLoading.value) {
      return
    }

    if (!force && cinemasState.initialized.value && cinemasState.data.value.length) {
      return
    }

    cinemasState.isLoading.value = true
    cinemasState.error.value = null

    try {
      cinemasState.data.value = await fetchCinemas()
      cinemasState.initialized.value = true
    } catch (err) {
      const normalized = normalizeApiError(err)
      cinemasState.error.value =
        normalized.payload?.message ?? 'Не удалось загрузить список кинотеатров'
    } finally {
      cinemasState.isLoading.value = false
    }
  }

  onMounted(() => {
    if (!cinemasState.initialized.value) {
      void loadCinemas()
    }
  })

  return {
    cinemas: cinemasState.data,
    isLoading: cinemasState.isLoading,
    error: cinemasState.error,
    loadCinemas,
  }
}

export function useCinemaDetails(cinemaId: number) {
  const cinema = ref<CinemaDto | null>(null)
  const sessions = ref<CinemaSessionDto[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadDetails() {
    isLoading.value = true
    error.value = null

    try {
      const sessionPromise = fetchCinemaSessions(cinemaId)

      let cinemaData: CinemaDto | null = null
      try {
        cinemaData = await fetchCinemaById(cinemaId)
      } catch (cinemaError) {
        const normalizedCinemaError = normalizeApiError(cinemaError)
        const cachedCinema = cinemasState.data.value.find((item) => item.id === cinemaId)

        if (cachedCinema) {
          cinemaData = cachedCinema
        } else {
          error.value =
            normalizedCinemaError.payload?.message ?? 'Не удалось загрузить информацию о кинотеатре'
        }
      }

      const sessionData = await sessionPromise

      if (cinemaData) {
        cinema.value = cinemaData
      }
      sessions.value = sessionData
    } catch (err) {
      const normalized = normalizeApiError(err)
      error.value = normalized.payload?.message ?? 'Не удалось загрузить информацию о кинотеатре'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    void loadDetails()
  })

  return {
    cinema,
    sessions,
    isLoading,
    error,
    loadDetails,
  }
}
