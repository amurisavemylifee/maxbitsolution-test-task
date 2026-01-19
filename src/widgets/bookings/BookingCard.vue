<script setup lang="ts">
import type { NormalizedBooking } from '@/entities/booking'
import { computed } from 'vue'

const props = defineProps<{
  booking: NormalizedBooking
}>()

const sessionDate = computed(() => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(props.booking.startTime))
})

const seatsLabel = computed(() =>
  props.booking.seats.map((seat) => `Ряд ${seat.rowNumber}, место ${seat.seatNumber}`).join(', ')
)
</script>

<template>
  <article class="booking-card">
    <header class="booking-card__header">
      <h3>{{ booking.movieTitle }}</h3>
      <span class="booking-card__time">{{ sessionDate }}</span>
    </header>

    <p class="booking-card__cinema">
      {{ booking.cinemaName }}
      <span v-if="booking.address" class="booking-card__address">{{ booking.address }}</span>
    </p>

    <p class="booking-card__seats">{{ seatsLabel }}</p>

    <slot />
  </article>
</template>

<style scoped>
.booking-card {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 20px;
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.booking-card__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.booking-card__header h3 {
  margin: 0;
  font-size: 20px;
}

.booking-card__time {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.booking-card__cinema {
  margin: 0;
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.booking-card__address {
  font-size: 13px;
}

.booking-card__seats {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
}
</style>
