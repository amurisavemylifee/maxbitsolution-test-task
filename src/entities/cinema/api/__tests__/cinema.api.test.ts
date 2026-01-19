import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchCinemaById,
  fetchCinemas,
  fetchCinemaSessions,
} from "../cinema.api";
import { CinemasService } from "@/shared/api";

vi.mock("@/shared/api", () => ({
  CinemasService: {
    getCinemas: vi.fn(),
    getCinemasSessions: vi.fn(),
  },
}));

describe("cinema api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps cinemas", async () => {
    vi.mocked(CinemasService.getCinemas).mockResolvedValue([
      { id: 1, name: "Cinema", address: "Address" },
    ]);

    const result = await fetchCinemas();

    expect(result).toEqual([{ id: 1, name: "Cinema", address: "Address" }]);
  });

  it("maps cinema fallback values", async () => {
    vi.mocked(CinemasService.getCinemas).mockResolvedValue([
      { id: undefined, name: undefined, address: undefined },
    ]);

    const result = await fetchCinemas();

    expect(result).toEqual([{ id: 0, name: "", address: "" }]);
  });

  it("throws when cinema not found", async () => {
    vi.mocked(CinemasService.getCinemas).mockResolvedValue([]);

    await expect(fetchCinemaById(10)).rejects.toThrow("Кинотеатр не найден");
  });

  it("returns cinema by id when found", async () => {
    vi.mocked(CinemasService.getCinemas).mockResolvedValue([
      { id: 10, name: "Cinema X", address: "Address X" },
    ]);

    const result = await fetchCinemaById(10);

    expect(result).toEqual({ id: 10, name: "Cinema X", address: "Address X" });
  });

  it("maps cinema sessions", async () => {
    vi.mocked(CinemasService.getCinemasSessions).mockResolvedValue([
      { id: 2, movieId: 3, cinemaId: 4, startTime: "2025-03-21T10:00:00.000Z" },
    ]);

    const result = await fetchCinemaSessions(4);

    expect(result).toEqual([
      { id: 2, movieId: 3, cinemaId: 4, startTime: "2025-03-21T10:00:00.000Z" },
    ]);
  });

  it("maps session fallback values", async () => {
    vi.mocked(CinemasService.getCinemasSessions).mockResolvedValue([
      {
        id: undefined,
        movieId: undefined,
        cinemaId: undefined,
        startTime: undefined,
      },
    ]);

    const result = await fetchCinemaSessions(1);

    expect(result).toEqual([{ id: 0, movieId: 0, cinemaId: 0, startTime: "" }]);
  });
});
