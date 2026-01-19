import { onMounted, ref } from 'vue'
import { normalizeApiError } from '@/shared/api/normalizeApiError'
import type { MovieDto } from './movie.types'
import { fetchMovieById, fetchMovies, fetchMovieSessions } from '../api/movie.api'
import type { MovieSessionDto } from './movie.types'

const moviesState = {
  data: ref<MovieDto[]>([]),
  isLoading: ref(false),
  error: ref<string | null>(null),
  initialized: ref(false),
}

export function useMovies() {
  async function loadMovies(force = false) {
    if (moviesState.isLoading.value) {
      return
    }

    if (!force && moviesState.initialized.value && moviesState.data.value.length) {
      return
    }

    moviesState.isLoading.value = true
    moviesState.error.value = null

    try {
      moviesState.data.value = await fetchMovies()
      moviesState.initialized.value = true
    } catch (err) {
      const normalized = normalizeApiError(err)
      moviesState.error.value =
        normalized.payload?.message ?? 'Не удалось загрузить список фильмов'
    } finally {
      moviesState.isLoading.value = false
    }
  }

  onMounted(() => {
    if (!moviesState.initialized.value) {
      void loadMovies()
    }
  })

  return {
    movies: moviesState.data,
    isLoading: moviesState.isLoading,
    error: moviesState.error,
    loadMovies,
  }
}

export function useMovieDetails(movieId: number) {
  const movie = ref<MovieDto | null>(null)
  const sessions = ref<MovieSessionDto[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadDetails() {
    isLoading.value = true
    error.value = null

    try {
      const sessionPromise = fetchMovieSessions(movieId)

      let movieData: MovieDto | null = null
      try {
        movieData = await fetchMovieById(movieId)
      } catch (movieError) {
        const normalizedMovieError = normalizeApiError(movieError)
        const cachedMovie = moviesState.data.value.find((item) => item.id === movieId)

        if (cachedMovie) {
          movieData = cachedMovie
        } else {
          error.value =
            normalizedMovieError.payload?.message ?? 'Не удалось загрузить информацию о фильме'
        }
      }

      const sessionData = await sessionPromise

      if (movieData) {
        movie.value = movieData
      }
      sessions.value = sessionData
    } catch (err) {
      const normalized = normalizeApiError(err)
      error.value = normalized.payload?.message ?? 'Не удалось загрузить информацию о фильме'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    void loadDetails()
  })

  return {
    movie,
    sessions,
    isLoading,
    error,
    loadDetails,
  }
}
