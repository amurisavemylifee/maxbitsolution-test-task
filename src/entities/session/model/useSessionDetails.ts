import { ref, onMounted } from 'vue'
import { normalizeApiError } from '@/shared/api/normalizeApiError'
import { fetchSessionDetails } from '../api/session.api'
import type { SeatCoordinate, SessionDetailsDto, SessionSeatLayout } from './session.types'

export function useSessionDetails(sessionId: number) {
  const session = ref<SessionDetailsDto | null>(null)
  const layout = ref<SessionSeatLayout | null>(null)
  const bookedSeats = ref<SeatCoordinate[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadDetails() {
    isLoading.value = true
    error.value = null

    try {
      const details = await fetchSessionDetails(sessionId)
      session.value = details
      layout.value = details.seats
      bookedSeats.value = details.bookedSeats
    } catch (err) {
      const normalized = normalizeApiError(err)
      error.value = normalized.payload?.message ?? 'Не удалось загрузить информацию о сеансе'
    } finally {
      isLoading.value = false
    }
  }

  function updateBookedSeats(seats: SeatCoordinate[]) {
    bookedSeats.value = seats
  }

  onMounted(() => {
    void loadDetails()
  })

  return {
    session,
    layout,
    bookedSeats,
    isLoading,
    error,
    loadDetails,
    updateBookedSeats,
  }
}
