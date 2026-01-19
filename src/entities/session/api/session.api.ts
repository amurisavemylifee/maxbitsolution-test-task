import { MovieSessionsService } from '@/shared/api'
import type { MovieSessionDetails, Seat } from '@/shared/api'
import type { SeatCoordinate, SessionDetailsDto } from '../model/session.types'

function mapSeat(seat: Seat): SeatCoordinate {
  return {
    rowNumber: seat.rowNumber ?? 0,
    seatNumber: seat.seatNumber ?? 0,
  }
}

function toApiSeat(seat: SeatCoordinate): Seat {
  return {
    rowNumber: seat.rowNumber,
    seatNumber: seat.seatNumber,
  }
}

function mapSessionDetails(details: MovieSessionDetails): SessionDetailsDto {
  return {
    id: details.id ?? 0,
    movieId: details.movieId ?? 0,
    cinemaId: details.cinemaId ?? 0,
    startTime: details.startTime ?? '',
    seats: {
      rows: details.seats?.rows ?? 0,
      seatsPerRow: details.seats?.seatsPerRow ?? 0,
    },
    bookedSeats: (details.bookedSeats ?? []).map(mapSeat),
  }
}

export async function fetchSessionDetails(sessionId: number): Promise<SessionDetailsDto> {
  const details = await MovieSessionsService.getMovieSessions({ movieSessionId: sessionId })
  return mapSessionDetails(details)
}

export interface BookSeatsResponse {
  bookingId: string
}

export async function bookSessionSeats(sessionId: number, seats: SeatCoordinate[]) {
  const response = await MovieSessionsService.postMovieSessionsBookings({
    movieSessionId: sessionId,
    requestBody: {
      seats: seats.map(toApiSeat),
    },
  })

  if (!response.bookingId) {
    throw new Error('Не удалось создать бронирование')
  }

  return {
    bookingId: response.bookingId,
  }
}
