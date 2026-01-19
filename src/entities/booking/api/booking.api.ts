import { BookingsService, SettingsService, UsersService } from '@/shared/api'
import type { Booking, Seat, Settings } from '@/shared/api'
import type { BookingDto, PaymentSettings } from '../model/booking.types'

function mapSeat(seat: Seat): BookingDto['seats'][number] {
  return {
    rowNumber: seat.rowNumber ?? 0,
    seatNumber: seat.seatNumber ?? 0,
  }
}

function mapBooking(booking: Booking): BookingDto {
  return {
    id: booking.id ?? '',
    userId: booking.userId ?? 0,
    movieSessionId: booking.movieSessionId ?? 0,
    sessionId: booking.sessionId ?? 0,
    bookedAt: booking.bookedAt ?? '',
    seats: (booking.seats ?? []).map(mapSeat),
    isPaid: booking.isPaid ?? false,
  }
}

function mapSettings(settings: Settings): PaymentSettings {
  return {
    bookingPaymentTimeSeconds: settings.bookingPaymentTimeSeconds ?? 0,
  }
}

export async function fetchBookings(): Promise<BookingDto[]> {
  const bookings = await UsersService.getMeBookings()
  return bookings.map(mapBooking)
}

export async function fetchSettings(): Promise<PaymentSettings> {
  const settings = await SettingsService.getSettings()
  return mapSettings(settings)
}

export async function payBooking(bookingId: string) {
  await BookingsService.postBookingsPayments({ bookingId })
}
