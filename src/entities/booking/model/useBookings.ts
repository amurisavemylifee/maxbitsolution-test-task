import { computed, ref } from 'vue'
import { normalizeApiError } from '@/shared/api/normalizeApiError'
import { fetchBookings, fetchSettings, payBooking } from '../api/booking.api'
import { fetchSessionDetails } from '@/entities/session'
import type { BookingDto, NormalizedBooking, PaymentSettings } from './booking.types'
import type { SessionDto } from '@/entities/session'
import type { MovieDto } from '@/entities/movie'
import type { CinemaDto } from '@/entities/cinema'

interface Dependencies {
  movies: MovieDto[]
  cinemas: CinemaDto[]
  sessions: Record<number, SessionDto>
}

function formatSeats(seats: NormalizedBooking['seats']) {
  return seats.map((seat) => `р${seat.rowNumber} м${seat.seatNumber}`).join(', ')
}

function computeExpiresAt(bookedAt: string, paymentSeconds: number) {
  const expires = new Date(bookedAt)
  expires.setSeconds(expires.getSeconds() + paymentSeconds)
  return expires.toISOString()
}

export function useBookings(dependencies: () => Dependencies) {
  const bookings = ref<BookingDto[]>([])
  const settings = ref<PaymentSettings | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const sessionCache = ref<Record<number, SessionDto>>({})

  const grouped = computed(() => {
    const deps = dependencies()
    const result: {
      unpaid: NormalizedBooking[]
      upcoming: NormalizedBooking[]
      past: NormalizedBooking[]
    } = {
      unpaid: [],
      upcoming: [],
      past: [],
    }

    bookings.value.forEach((booking) => {
      const session =
        deps.sessions[booking.movieSessionId] ?? sessionCache.value[booking.movieSessionId]
      if (!session) return

      const movie = deps.movies.find((item) => item.id === session.movieId)
      const cinema = deps.cinemas.find((item) => item.id === session.cinemaId)

      const normalized: NormalizedBooking = {
        id: booking.id,
        movieTitle: movie?.title ?? 'Фильм',
        cinemaName: cinema?.name ?? 'Кинотеатр',
        address: cinema?.address,
        startTime: session.startTime,
        seats: booking.seats,
        bookedAt: booking.bookedAt,
        isPaid: booking.isPaid,
      }

      if (!booking.isPaid && settings.value) {
        normalized.expiresAt = computeExpiresAt(
          booking.bookedAt,
          settings.value.bookingPaymentTimeSeconds
        )
      }

      const sessionDate = new Date(session.startTime)
      const now = new Date()

      if (!booking.isPaid) {
        result.unpaid.push(normalized)
      } else if (sessionDate > now) {
        result.upcoming.push(normalized)
      } else {
        result.past.push(normalized)
      }
    })

    const sortByTime = (a: NormalizedBooking, b: NormalizedBooking) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()

    result.unpaid.sort(sortByTime)
    result.upcoming.sort(sortByTime)
    result.past.sort(sortByTime)

    return result
  })

  async function loadAll() {
    isLoading.value = true
    error.value = null

    try {
      const [bookingsData, settingsData] = await Promise.all([fetchBookings(), fetchSettings()])
      bookings.value = bookingsData
      settings.value = settingsData

      const deps = dependencies()
      Object.assign(sessionCache.value, deps.sessions)

      await Promise.all(
        bookingsData.map(async (booking) => {
          if (!sessionCache.value[booking.movieSessionId]) {
            const sessionDetails = await fetchSessionDetails(booking.movieSessionId)
            sessionCache.value[sessionDetails.id] = sessionDetails
          }
        })
      )
    } catch (err) {
      const normalized = normalizeApiError(err)
      error.value = normalized.payload?.message ?? 'Не удалось загрузить список билетов'
    } finally {
      isLoading.value = false
    }
  }

  async function pay(bookingId: string) {
    await payBooking(bookingId)
    await loadAll()
  }

  function removeBooking(bookingId: string) {
    bookings.value = bookings.value.filter((booking) => booking.id !== bookingId)
  }

  return {
    bookings,
    settings,
    grouped,
    isLoading,
    error,
    loadAll,
    pay,
    removeBooking,
    formatSeats,
  }
}
