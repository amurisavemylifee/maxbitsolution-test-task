<script setup lang="ts">
import CinemaCard from '@/entities/cinema/ui/CinemaCard.vue'
import type { CinemaDto } from '@/entities/cinema'

defineProps<{
  cinemas: CinemaDto[]
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (event: 'viewSessions', cinemaId: number): void
}>()
</script>

<template>
  <section class="cinemas-list">
    <header class="cinemas-list__header">
      <h2>Кинотеатры</h2>
    </header>

    <p v-if="isLoading" class="cinemas-list__info">Загрузка...</p>
    <p v-else-if="error" class="cinemas-list__info">{{ error }}</p>
    <p v-else-if="!cinemas.length" class="cinemas-list__info">Нет доступных кинотеатров</p>

    <div v-else class="cinemas-list__grid">
      <CinemaCard
        v-for="cinema in cinemas"
        :key="cinema.id"
        :cinema="cinema"
        @view-sessions="emit('viewSessions', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.cinemas-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cinemas-list__header h2 {
  margin: 0;
  font-size: 32px;
}

.cinemas-list__grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cinemas-list__info {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
}
</style>
