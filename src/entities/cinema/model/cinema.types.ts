export interface CinemaDto {
  id: number
  name: string
  address: string
}

export interface CinemaSessionDto {
  id: number
  movieId: number
  cinemaId: number
  startTime: string
}
