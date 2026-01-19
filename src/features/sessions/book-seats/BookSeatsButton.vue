<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/shared/components/ui/AppButton.vue'
import type { SeatCoordinate } from '@/entities/session'
import { bookSessionSeats } from '@/entities/session'
import { normalizeApiError } from '@/shared/api/normalizeApiError'

const props = defineProps<{
  sessionId: number
  seats: SeatCoordinate[]
}>()

const emit = defineEmits<{
  (event: 'success', bookingId: string): void
  (event: 'error', message: string): void
}>()

const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)
const router = useRouter()

async function handleBooking() {
  if (!props.seats.length || isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = null

  try {
    const response = await bookSessionSeats(props.sessionId, props.seats)
    emit('success', response.bookingId)
    router.push({ name: 'tickets' })
  } catch (error) {
    const normalized = normalizeApiError(error)
    const message = normalized.payload?.message ?? 'Не удалось забронировать места'
    errorMessage.value = message
    emit('error', message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="booking-action">
    <AppButton type="button" :disabled="!seats.length || isSubmitting" @click="handleBooking">
      {{ isSubmitting ? 'Бронирование...' : 'Забронировать' }}
    </AppButton>
    <p v-if="errorMessage" class="booking-action__error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.booking-action {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.booking-action__error {
  margin: 0;
  color: #ff6b6b;
  font-size: 14px;
}
</style>
