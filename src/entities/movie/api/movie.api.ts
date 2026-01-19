import { MoviesService } from '@/shared/api'
import type { Movie, MovieSession } from '@/shared/api'
import type { MovieDto, MovieSessionDto } from '../model/movie.types'
import { getApiBaseUrl } from '@/shared/config/env'

const apiBaseUrl = getApiBaseUrl()

function resolvePosterUrl(path?: string | null): string | null {
  if (!path) {
    return null
  }

  try {
    return new URL(path, apiBaseUrl).toString()
  } catch (error) {
    console.warn('Failed to resolve poster url', error)
    return path
  }
}

function mapMovie(movie: Movie): MovieDto {
  return {
    id: movie.id ?? 0,
    title: movie.title ?? '',
    description: movie.description ?? '',
    year: movie.year ?? 0,
    lengthMinutes: movie.lengthMinutes ?? 0,
    posterImage: resolvePosterUrl(movie.posterImage),
    rating: movie.rating ?? 0,
  }
}

function mapSession(session: MovieSession): MovieSessionDto {
  return {
    id: session.id ?? 0,
    movieId: session.movieId ?? 0,
    cinemaId: session.cinemaId ?? 0,
    startTime: session.startTime ?? '',
  }
}

export async function fetchMovies(): Promise<MovieDto[]> {
  const movies = await MoviesService.getMovies()
  return movies.map(mapMovie)
}

export async function fetchMovieById(id: number): Promise<MovieDto> {
  const movies = await MoviesService.getMovies()
  const movie = movies.find((item) => item.id === id)

  if (!movie) {
    throw new Error('Фильм не найден')
  }

  return mapMovie(movie)
}

export async function fetchMovieSessions(movieId: number): Promise<MovieSessionDto[]> {
  const sessions = await MoviesService.getMoviesSessions({ movieId })
  return sessions.map(mapSession)
}
