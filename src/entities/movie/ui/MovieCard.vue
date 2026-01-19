<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '@/shared/components/ui/AppButton.vue'
import type { MovieDto } from '../model/movie.types'

const props = defineProps<{
  movie: MovieDto
}>()

const emit = defineEmits<{
  (event: 'viewSessions', movieId: number): void
}>()

const duration = computed(() => {
  const hours = Math.floor(props.movie.lengthMinutes / 60)
  const minutes = props.movie.lengthMinutes % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}`
})
</script>

<template>
  <article class="movie-card">
    <div class="movie-card__poster" aria-hidden="true">
      <span v-if="!movie.posterImage" class="movie-card__poster-placeholder">🎬</span>
      <img v-else :src="movie.posterImage" :alt="movie.title" />
    </div>
    <div class="movie-card__info">
      <h3 class="movie-card__title">{{ movie.title }}</h3>
      <p class="movie-card__meta">
        <span>Продолжительность: {{ duration }}</span>
        <span>Рейтинг: {{ movie.rating.toFixed(2) }}</span>
        <span>Год: {{ movie.year }}</span>
      </p>
    </div>
    <AppButton variant="secondary" @click="emit('viewSessions', movie.id)">Посмотреть сеансы</AppButton>
  </article>
</template>

<style scoped>
.movie-card {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background-color: var(--color-surface);
}

.movie-card__poster {
  width: 80px;
  height: 80px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
}

.movie-card__poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-card__poster-placeholder {
  font-size: 32px;
  opacity: 0.6;
}

.movie-card__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.movie-card__title {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.movie-card__meta {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--color-text-secondary);
  font-size: 14px;
}
</style>
