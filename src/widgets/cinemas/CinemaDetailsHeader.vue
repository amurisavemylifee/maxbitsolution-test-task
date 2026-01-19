<script setup lang="ts">
import type { CinemaDto } from '@/entities/cinema'

defineProps<{
  cinema: CinemaDto
}>()
</script>

<template>
  <section class="cinema-details">
    <h1>{{ cinema.name }}</h1>
    <p class="cinema-details__address">{{ cinema.address }}</p>
  </section>
</template>

<style scoped>
.cinema-details {
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
  background-color: var(--color-surface);
}

.cinema-details h1 {
  margin: 0 0 12px;
  font-size: 32px;
}

.cinema-details__address {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 16px;
}
</style>
