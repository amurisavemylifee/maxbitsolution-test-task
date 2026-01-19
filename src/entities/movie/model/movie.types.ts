export interface MovieDto {
  id: number
  title: string
  description: string
  year: number
  lengthMinutes: number
  posterImage: string | null
  rating: number
}

export interface MovieSessionDto {
  id: number
  movieId: number
  cinemaId: number
  startTime: string
}

export interface MovieDetails extends MovieDto {
  sessions: MovieSessionDto[]
}
