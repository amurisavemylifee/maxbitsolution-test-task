import { computed, ref, watch, type Ref } from 'vue'
import type { SeatCoordinate } from '@/entities/session'

function seatKey(seat: SeatCoordinate) {
  return `${seat.rowNumber}-${seat.seatNumber}`
}

export interface UseSeatSelectionOptions {
  bookedSeats: Ref<SeatCoordinate[]>
  initialSelection?: SeatCoordinate[]
}

function areSeatsEqual(a: SeatCoordinate[], b: SeatCoordinate[]) {
  if (a.length !== b.length) {
    return false
  }

  for (let index = 0; index < a.length; index += 1) {
    const left = a[index]
    const right = b[index]

    if (!left || !right) {
      return false
    }

    if (left.rowNumber !== right.rowNumber || left.seatNumber !== right.seatNumber) {
      return false
    }
  }

  return true
}

export function useSeatSelection(options: UseSeatSelectionOptions) {
  const selectedSeats = ref<SeatCoordinate[]>(options.initialSelection ?? [])

  const bookedSet = computed(() => new Set(options.bookedSeats.value.map(seatKey)))

  function setSelection(seats: SeatCoordinate[]) {
    const filtered = seats.filter((seat) => !bookedSet.value.has(seatKey(seat)))

    if (areSeatsEqual(filtered, selectedSeats.value)) {
      return
    }

    selectedSeats.value = filtered
  }

  function toggleSeat(seat: SeatCoordinate) {
    if (bookedSet.value.has(seatKey(seat))) {
      return
    }

    const key = seatKey(seat)
    const exists = selectedSeats.value.some((item) => seatKey(item) === key)

    const nextSelection = exists
      ? selectedSeats.value.filter((item) => seatKey(item) !== key)
      : [...selectedSeats.value, seat]

    if (areSeatsEqual(nextSelection, selectedSeats.value)) {
      return
    }

    selectedSeats.value = nextSelection
  }

  function reset() {
    selectedSeats.value = []
  }

  watch(
    options.bookedSeats,
    (newBooked) => {
      const newBookedSet = new Set(newBooked.map(seatKey))
      const filtered = selectedSeats.value.filter((seat) => !newBookedSet.has(seatKey(seat)))

      if (areSeatsEqual(filtered, selectedSeats.value)) {
        return
      }

      selectedSeats.value = filtered
    }
  )

  return {
    selectedSeats,
    toggleSeat,
    reset,
    setSelection,
  }
}
