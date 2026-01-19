<script setup lang="ts">
import { computed, watch } from 'vue'
import SeatMap from '@/entities/session/ui/SeatMap.vue'
import type { SeatCoordinate, SessionSeatLayout } from '@/entities/session'
import { useSeatSelection } from './useSeatSelection'

const props = withDefaults(
  defineProps<{
    layout: SessionSeatLayout | null
    bookedSeats: SeatCoordinate[]
    modelValue: SeatCoordinate[]
    interactive?: boolean
  }>(),
  {
    bookedSeats: () => [],
    modelValue: () => [],
    interactive: true,
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: SeatCoordinate[]): void
  (event: 'interactionBlocked', seat: SeatCoordinate): void
}>()

const bookedSeatsRef = computed(() => props.bookedSeats)

const seatSelection = useSeatSelection({
  bookedSeats: bookedSeatsRef,
  initialSelection: props.modelValue,
})

watch(
  () => props.modelValue,
  (value) => {
    seatSelection.setSelection(value ?? [])
  },
  { immediate: true }
)

watch(
  seatSelection.selectedSeats,
  (value) => {
    emit('update:modelValue', value)
  }
)

const selectedCount = computed(() => seatSelection.selectedSeats.value.length)
</script>

<template>
  <div class="select-seats">
    <SeatMap
      v-if="layout"
      :rows="layout.rows"
      :seats-per-row="layout.seatsPerRow"
      :booked-seats="bookedSeats"
      :selected-seats="seatSelection.selectedSeats"
      :interactive="interactive"
      @toggle="seatSelection.toggleSeat"
      @inactive-select="(seat) => emit('interactionBlocked', seat)"
    />

    <p class="select-seats__info">
      {{ interactive ? 'Выбрано мест' : 'Свободные места' }}: {{ selectedCount }}
    </p>
  </div>
</template>

<style scoped>
.select-seats {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.select-seats__info {
  margin: 0;
  color: var(--color-text-secondary);
}
</style>
