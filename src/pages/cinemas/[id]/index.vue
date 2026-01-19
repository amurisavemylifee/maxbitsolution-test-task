<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCinemaDetails } from '@/entities/cinema'
import { groupSessionsByDate } from '@/entities/session'
import { useMovies } from '@/entities/movie'
import CinemaDetailsHeader from '@/widgets/cinemas/CinemaDetailsHeader.vue'
import CinemaSessionsSchedule from '@/widgets/cinemas/CinemaSessionsSchedule.vue'

const route = useRoute()
const router = useRouter()
const cinemaId = Number(route.params.id)

if (Number.isNaN(cinemaId)) {
  router.replace({ name: 'cinemas' })
}

const { cinema, sessions, isLoading, error } = useCinemaDetails(cinemaId)
const { movies, isLoading: moviesLoading, error: moviesError } = useMovies()

const sessionGroups = computed(() => {
  if (!sessions.value.length) {
    return []
  }

  const lookup = Object.fromEntries(movies.value.map((movie) => [movie.id, movie.title]))

  return groupSessionsByDate(sessions.value, (session) => session.movieId, {
    entityLookup: lookup,
    fallbackName: 'Фильм',
  })
})

const combinedError = computed(() => error.value ?? moviesError.value ?? null)

const isAnyLoading = computed(() => isLoading.value || moviesLoading.value)
</script>

<template>
  <section class="page">
    <RouterLink class="page__back" :to="{ name: 'cinemas' }">← К списку кинотеатров</RouterLink>

    <p v-if="!isAnyLoading && combinedError" class="page__error">{{ combinedError }}</p>

    <CinemaDetailsHeader v-if="cinema && !combinedError" :cinema="cinema" />

    <CinemaSessionsSchedule
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
