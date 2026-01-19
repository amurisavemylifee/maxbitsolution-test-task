export interface SessionDto {
  id: number
  movieId: number
  cinemaId: number
  startTime: string
}

export interface SessionTimeSlot {
  id: number
  startTime: string
  timeLabel: string
}

export interface SeatCoordinate {
  rowNumber: number
  seatNumber: number
}

export interface SessionSeatLayout {
  rows: number
  seatsPerRow: number
}

export interface SessionDetailsDto extends SessionDto {
  seats: SessionSeatLayout
  bookedSeats: SeatCoordinate[]
}

export interface SessionLookupEntry extends SessionDto {}

export interface SessionGroupItem {
  entityId: number
  entityName: string
  slots: SessionTimeSlot[]
}

export interface SessionDayGroup {
  dateKey: string
  dateLabel: string
  items: SessionGroupItem[]
}
