import { beforeEach, describe, expect, it, vi } from 'vitest'
import { bookSessionSeats, fetchSessionDetails } from '../session.api'
import { MovieSessionsService } from '@/shared/api'

vi.mock('@/shared/api', () => ({
  MovieSessionsService: {
    getMovieSessions: vi.fn(),
    postMovieSessionsBookings: vi.fn(),
  },
}))

describe('session api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('maps session details', async () => {
    vi.mocked(MovieSessionsService.getMovieSessions).mockResolvedValue({
      id: 10,
      movieId: 2,
      cinemaId: 3,
      startTime: '2025-03-21T10:00:00.000Z',
      seats: {
        rows: 5,
        seatsPerRow: 6,
      },
      bookedSeats: [{ rowNumber: 1, seatNumber: 2 }],
    })

    const result = await fetchSessionDetails(10)

    expect(result).toEqual({
      id: 10,
      movieId: 2,
      cinemaId: 3,
      startTime: '2025-03-21T10:00:00.000Z',
      seats: {
        rows: 5,
        seatsPerRow: 6,
      },
      bookedSeats: [{ rowNumber: 1, seatNumber: 2 }],
    })
  })

  it('throws when booking id missing', async () => {
    vi.mocked(MovieSessionsService.postMovieSessionsBookings).mockResolvedValue({})

    await expect(bookSessionSeats(10, [{ rowNumber: 1, seatNumber: 1 }])).rejects.toThrow(
      'Не удалось создать бронирование'
    )
  })

  it('returns booking id on success', async () => {
    vi.mocked(MovieSessionsService.postMovieSessionsBookings).mockResolvedValue({
      bookingId: 'booking-1',
    })

    const result = await bookSessionSeats(10, [{ rowNumber: 1, seatNumber: 1 }])

    expect(result).toEqual({ bookingId: 'booking-1' })
  })
})
