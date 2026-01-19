<script setup lang="ts">
import MovieCard from '@/entities/movie/ui/MovieCard.vue'
import type { MovieDto } from '@/entities/movie'

defineProps<{
  movies: MovieDto[]
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (event: 'viewSessions', movieId: number): void
}>()
</script>

<template>
  <section class="movies-list">
    <header class="movies-list__header">
      <h2>Фильмы</h2>
    </header>

    <p v-if="isLoading" class="movies-list__info">Загрузка...</p>
    <p v-else-if="error" class="movies-list__info">{{ error }}</p>
    <p v-else-if="!movies.length" class="movies-list__info">Нет доступных фильмов</p>

    <div v-else class="movies-list__grid">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @view-sessions="emit('viewSessions', $event)" />
    </div>
  </section>
</template>

<style scoped>
.movies-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.movies-list__header h2 {
  margin: 0;
  font-size: 32px;
}

.movies-list__grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.movies-list__info {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
}
</style>
