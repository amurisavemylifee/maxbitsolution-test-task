<script setup lang="ts">
import { computed, unref } from 'vue'
import type { Ref } from 'vue'
import SeatCell from './SeatCell.vue'
import type { SeatCoordinate } from '@/entities/session'

const props = withDefaults(
  defineProps<{
    rows: number
    seatsPerRow: number
    bookedSeats: SeatCoordinate[] | Ref<SeatCoordinate[]>
    selectedSeats: SeatCoordinate[] | Ref<SeatCoordinate[]>
    interactive?: boolean
  }>(),
  {
    interactive: true,
  }
)

const emit = defineEmits<{
  (event: 'toggle', seat: SeatCoordinate): void
  (event: 'inactiveSelect', seat: SeatCoordinate): void
}>()

function seatKey(seat: SeatCoordinate) {
  return `${seat.rowNumber}-${seat.seatNumber}`
}

const bookedSet = computed(() => {
  const seats = unref(props.bookedSeats)
  return new Set(seats.map(seatKey))
})

const selectedSet = computed(() => {
  const seats = unref(props.selectedSeats)
  return new Set(seats.map(seatKey))
})

function isSeatBooked(rowNumber: number, seatNumber: number) {
  return bookedSet.value.has(`${rowNumber}-${seatNumber}`)
}

function isSeatSelected(rowNumber: number, seatNumber: number) {
  return selectedSet.value.has(`${rowNumber}-${seatNumber}`)
}

function handleSelect(rowNumber: number, seatNumber: number) {
  const seat: SeatCoordinate = { rowNumber, seatNumber }

  if (!props.interactive) {
    emit('inactiveSelect', seat)
    return
  }

  if (bookedSet.value.has(seatKey(seat))) {
    return
  }

  emit('toggle', seat)
}
</script>

<template>
  <div class="seat-map">
    <div class="seat-map__header">
      <span class="seat-map__row-label seat-map__row-label--placeholder">ряд</span>
      <div
        class="seat-map__header-grid"
        :style="{ gridTemplateColumns: `repeat(${seatsPerRow}, var(--seat-size))` }"
      >
        <span v-for="seatNumber in seatsPerRow" :key="seatNumber">{{ seatNumber }}</span>
      </div>
    </div>
    <div class="seat-map__rows">
      <div v-for="rowNumber in rows" :key="rowNumber" class="seat-map__row">
        <span class="seat-map__row-label">ряд {{ rowNumber }}</span>
        <div
          class="seat-map__row-seats"
          :style="{ gridTemplateColumns: `repeat(${seatsPerRow}, var(--seat-size))` }"
        >
          <SeatCell
            v-for="seatNumber in seatsPerRow"
            :key="seatNumber"
            :label="`Ряд ${rowNumber}, место ${seatNumber}`"
            :status="
              isSeatBooked(rowNumber, seatNumber)
                ? 'booked'
                : isSeatSelected(rowNumber, seatNumber)
                  ? 'selected'
                  : 'available'
            "
            @select="handleSelect(rowNumber, seatNumber)"
          />
        </div>
      </div>
    </div>
    <div class="seat-map__legend">
      <div class="seat-map__legend-item">
        <span class="seat-map__legend-dot seat-map__legend-dot--available" /> Свободно
      </div>
      <div class="seat-map__legend-item">
        <span class="seat-map__legend-dot seat-map__legend-dot--selected" /> Выбрано
      </div>
      <div class="seat-map__legend-item">
        <span class="seat-map__legend-dot seat-map__legend-dot--booked" /> Занято
      </div>
    </div>
  </div>
</template>

<style scoped>
.seat-map {
  --seat-size: 32px;
  --seat-gap: 8px;
  --row-label-width: 70px;
  --row-gap: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
}

.seat-map__header {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: var(--row-gap);
  color: var(--color-text-secondary);
  font-size: 12px;
}

.seat-map__header-grid {
  display: grid;
  gap: var(--seat-gap);
  justify-content: center;
  text-align: center;
}

.seat-map__rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.seat-map__row {
  display: flex;
  align-items: center;
  gap: var(--row-gap);
  justify-content: center;
}

.seat-map__row-label {
  width: var(--row-label-width);
  text-transform: lowercase;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.seat-map__row-label--placeholder {
  visibility: hidden;
}

.seat-map__row-seats {
  display: grid;
  grid-template-columns: repeat(var(--seats-per-row), var(--seat-size));
  gap: var(--seat-gap);
}

.seat-map__legend {
  display: flex;
  gap: 24px;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.seat-map__legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.seat-map__legend-dot {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.seat-map__legend-dot--available {
  background-color: transparent;
}

.seat-map__legend-dot--selected {
  background-color: #4c6ef5;
  border-color: #7995ff;
}

.seat-map__legend-dot--booked {
  background-color: rgba(235, 87, 87, 0.35);
  border-color: rgba(235, 87, 87, 0.8);
}
</style>
