<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCinemas } from '@/entities/cinema'
import { groupSessionsByDate } from '@/entities/session'
import { useMovieDetails } from '@/entities/movie'
import MovieDetailsHeader from '@/widgets/movies/MovieDetailsHeader.vue'
import MovieSessionsSchedule from '@/widgets/movies/MovieSessionsSchedule.vue'

const route = useRoute()
const router = useRouter()
const movieId = Number(route.params.id)

if (Number.isNaN(movieId)) {
  router.replace({ name: 'movies' })
}

const { movie, sessions, isLoading, error } = useMovieDetails(movieId)
const { cinemas, isLoading: cinemasLoading, error: cinemasError } = useCinemas()

const sessionGroups = computed(() => {
  if (!sessions.value.length) {
    return []
  }

  const lookup = Object.fromEntries(cinemas.value.map((cinema) => [cinema.id, cinema.name]))

  return groupSessionsByDate(sessions.value, (session) => session.cinemaId, {
    entityLookup: lookup,
    fallbackName: 'Кинотеатр',
  })
})

const combinedError = computed(() => error.value ?? cinemasError.value ?? null)

const isAnyLoading = computed(() => isLoading.value || cinemasLoading.value)
</script>

<template>
  <section class="page">
    <RouterLink class="page__back" :to="{ name: 'movies' }">← К списку фильмов</RouterLink>

    <p v-if="!isAnyLoading && combinedError" class="page__error">{{ combinedError }}</p>

    <MovieDetailsHeader v-if="movie && !combinedError" :movie="movie" />

    <MovieSessionsSchedule
      :groups="sessionGroups"
      :is-loading="isAnyLoading"
      :error="combinedError"
      @select-session="(sessionId) => router.push({ name: 'session', params: { id: sessionId } })"
    />
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page__back {
  color: var(--color-text-secondary);
}

.page__error {
  margin: 0;
  color: #ff6b6b;
}
</style>
