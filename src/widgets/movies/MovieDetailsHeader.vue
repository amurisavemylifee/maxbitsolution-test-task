<script setup lang="ts">
import { computed } from 'vue'
import type { MovieDto } from '@/entities/movie'

const props = defineProps<{
  movie: MovieDto
}>()

const duration = computed(() => {
  const hours = Math.floor(props.movie.lengthMinutes / 60)
  const minutes = props.movie.lengthMinutes % 60
  return `${hours} ч ${minutes.toString().padStart(2, '0')} мин`
})
</script>

<template>
  <section class="movie-details">
    <div class="movie-details__poster">
      <span v-if="!movie.posterImage" class="movie-details__poster-placeholder">🎬</span>
      <img v-else :src="movie.posterImage" :alt="movie.title" />
    </div>
    <div class="movie-details__content">
      <h1>{{ movie.title }}</h1>
      <p class="movie-details__description">{{ movie.description }}</p>
      <ul class="movie-details__meta">
        <li>Год: {{ movie.year }}</li>
        <li>Продолжительность: {{ duration }}</li>
        <li>Рейтинг: {{ movie.rating.toFixed(2) }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.movie-details {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  padding: 32px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background-color: var(--color-surface);
}

.movie-details__poster {
  width: 200px;
  height: 280px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
}

.movie-details__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-details__poster-placeholder {
  font-size: 48px;
  opacity: 0.5;
}

.movie-details__content h1 {
  margin: 0 0 16px;
  font-size: 36px;
}

.movie-details__description {
  margin: 0 0 24px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.movie-details__meta {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
  color: var(--color-text-secondary);
}
</style>
