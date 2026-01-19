import { CinemasService } from '@/shared/api'
import type { Cinema, MovieSession } from '@/shared/api'
import type { CinemaDto, CinemaSessionDto } from '../model/cinema.types'

function mapCinema(cinema: Cinema): CinemaDto {
  return {
    id: cinema.id ?? 0,
    name: cinema.name ?? '',
    address: cinema.address ?? '',
  }
}

function mapSession(session: MovieSession): CinemaSessionDto {
  return {
    id: session.id ?? 0,
    movieId: session.movieId ?? 0,
    cinemaId: session.cinemaId ?? 0,
    startTime: session.startTime ?? '',
  }
}

export async function fetchCinemas(): Promise<CinemaDto[]> {
  const cinemas = await CinemasService.getCinemas()
  return cinemas.map(mapCinema)
}

export async function fetchCinemaById(id: number): Promise<CinemaDto> {
  const cinemas = await CinemasService.getCinemas()
  const cinema = cinemas.find((item) => item.id === id)

  if (!cinema) {
    throw new Error('Кинотеатр не найден')
  }

  return mapCinema(cinema)
}

export async function fetchCinemaSessions(cinemaId: number): Promise<CinemaSessionDto[]> {
  const sessions = await CinemasService.getCinemasSessions({ cinemaId })
  return sessions.map(mapSession)
}
