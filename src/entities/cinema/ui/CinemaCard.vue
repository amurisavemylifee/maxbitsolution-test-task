<script setup lang="ts">
import AppButton from '@/shared/components/ui/AppButton.vue'
import type { CinemaDto } from '../model/cinema.types'

defineProps<{
  cinema: CinemaDto
}>()

const emit = defineEmits<{
  (event: 'viewSessions', cinemaId: number): void
}>()
</script>

<template>
  <article class="cinema-card">
    <div>
      <h3 class="cinema-card__title">{{ cinema.name }}</h3>
      <p class="cinema-card__address">{{ cinema.address }}</p>
    </div>
    <AppButton variant="secondary" @click="emit('viewSessions', cinema.id)">Посмотреть сеансы</AppButton>
  </article>
</template>

<style scoped>
.cinema-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background-color: var(--color-surface);
}

.cinema-card__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
}

.cinema-card__address {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}
</style>
