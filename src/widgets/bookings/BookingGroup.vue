<script setup lang="ts">
import BookingCard from './BookingCard.vue'
import CountdownTimer from '@/shared/components/ui/CountdownTimer.vue'
import AppButton from '@/shared/components/ui/AppButton.vue'
import type { NormalizedBooking } from '@/entities/booking'

defineProps<{
  title: string
  bookings: NormalizedBooking[]
  showTimer?: boolean
}>()

const emit = defineEmits<{
  (event: 'pay', bookingId: string): void
  (event: 'expired', bookingId: string): void
}>()
</script>

<template>
  <section class="booking-group">
    <h2>{{ title }}</h2>

    <p v-if="!bookings.length" class="booking-group__empty">Нет билетов</p>

    <div v-else class="booking-group__list">
      <BookingCard v-for="booking in bookings" :key="booking.id" :booking="booking">
        <div v-if="showTimer" class="booking-group__actions">
          <AppButton variant="primary" @click="emit('pay', booking.id)">Оплатить</AppButton>
          <CountdownTimer
            v-if="booking.expiresAt"
            :target="booking.expiresAt"
            @expired="emit('expired', booking.id)"
          />
        </div>
      </BookingCard>
    </div>
  </section>
</template>

<style scoped>
.booking-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.booking-group h2 {
  margin: 0;
  font-size: 24px;
}

.booking-group__empty {
  margin: 0;
  color: var(--color-text-secondary);
}

.booking-group__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.booking-group__actions {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
