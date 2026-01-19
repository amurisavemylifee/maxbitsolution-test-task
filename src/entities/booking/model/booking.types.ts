import type { SeatCoordinate } from '@/entities/session'

export interface BookingDto {
  id: string
  userId: number
  movieSessionId: number
  sessionId: number
  bookedAt: string
  seats: SeatCoordinate[]
  isPaid: boolean
}

export interface BookingGroup {
  title: string
  items: NormalizedBooking[]
}

export interface NormalizedBooking {
  id: string
  movieTitle: string
  cinemaName: string
  address?: string
  startTime: string
  seats: SeatCoordinate[]
  bookedAt: string
  isPaid: boolean
  expiresAt?: string
}

export interface PaymentSettings {
  bookingPaymentTimeSeconds: number
}
