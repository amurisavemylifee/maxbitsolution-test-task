import { describe, expect, it, vi } from "vitest";
import { fetchBookings, fetchSettings, payBooking } from "../booking.api";
import { BookingsService, SettingsService, UsersService } from "@/shared/api";

vi.mock("@/shared/api", () => ({
  UsersService: {
    getMeBookings: vi.fn(),
  },
  SettingsService: {
    getSettings: vi.fn(),
  },
  BookingsService: {
    postBookingsPayments: vi.fn(),
  },
}));

describe("booking api", () => {
  it("maps bookings response", async () => {
    vi.mocked(UsersService.getMeBookings).mockResolvedValue([
      {
        id: "1",
        userId: 2,
        movieSessionId: 3,
        sessionId: 3,
        bookedAt: "2025-03-20T10:00:00.000Z",
        seats: [{ rowNumber: undefined, seatNumber: undefined }],
        isPaid: true,
      },
    ]);

    const result = await fetchBookings();

    expect(result).toEqual([
      {
        id: "1",
        userId: 2,
        movieSessionId: 3,
        sessionId: 3,
        bookedAt: "2025-03-20T10:00:00.000Z",
        seats: [{ rowNumber: 0, seatNumber: 0 }],
        isPaid: true,
      },
    ]);
  });

  it("maps fallback booking values", async () => {
    vi.mocked(UsersService.getMeBookings).mockResolvedValue([
      {
        id: undefined,
        userId: undefined,
        movieSessionId: undefined,
        sessionId: undefined,
        bookedAt: undefined,
        seats: undefined,
        isPaid: undefined,
      },
    ]);

    const result = await fetchBookings();

    expect(result).toEqual([
      {
        id: "",
        userId: 0,
        movieSessionId: 0,
        sessionId: 0,
        bookedAt: "",
        seats: [],
        isPaid: false,
      },
    ]);
  });

  it("maps settings response", async () => {
    vi.mocked(SettingsService.getSettings).mockResolvedValue({
      bookingPaymentTimeSeconds: undefined,
    });

    const result = await fetchSettings();

    expect(result).toEqual({ bookingPaymentTimeSeconds: 0 });
  });

  it("keeps settings value when present", async () => {
    vi.mocked(SettingsService.getSettings).mockResolvedValue({
      bookingPaymentTimeSeconds: 900,
    });

    const result = await fetchSettings();

    expect(result).toEqual({ bookingPaymentTimeSeconds: 900 });
  });

  it("sends booking payment request", async () => {
    vi.mocked(BookingsService.postBookingsPayments).mockResolvedValue({});

    await payBooking("booking-1");

    expect(BookingsService.postBookingsPayments).toHaveBeenCalledWith({
      bookingId: "booking-1",
    });
  });
});
