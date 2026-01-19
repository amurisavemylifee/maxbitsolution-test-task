import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchMovieById, fetchMovies } from "../movie.api";
import { MoviesService } from "@/shared/api";

vi.mock("@/shared/api", () => ({
  MoviesService: {
    getMovies: vi.fn(),
    getMoviesSessions: vi.fn(),
  },
}));

vi.mock("@/shared/config/env", () => ({
  getApiBaseUrl: () => "http://localhost:3022",
}));

describe("movie api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("maps movies and resolves poster url", async () => {
    vi.mocked(MoviesService.getMovies).mockResolvedValue([
      {
        id: 1,
        title: "Movie",
        description: "Desc",
        year: 2024,
        lengthMinutes: 120,
        posterImage: "/static/poster.jpg",
        rating: 8.5,
      },
    ]);

    const result = await fetchMovies();

    expect(result).toEqual([
      {
        id: 1,
        title: "Movie",
        description: "Desc",
        year: 2024,
        lengthMinutes: 120,
        posterImage: "http://localhost:3022/static/poster.jpg",
        rating: 8.5,
      },
    ]);
  });

  it("throws when movie not found", async () => {
    vi.mocked(MoviesService.getMovies).mockResolvedValue([
      {
        id: 2,
        title: "Other",
        description: "Desc",
        year: 2024,
        lengthMinutes: 120,
        posterImage: undefined,
        rating: 7.5,
      },
    ]);

    await expect(fetchMovieById(1)).rejects.toThrow("Фильм не найден");
  });

  it("returns movie by id when found", async () => {
    vi.mocked(MoviesService.getMovies).mockResolvedValue([
      {
        id: 5,
        title: "Target",
        description: "Desc",
        year: 2024,
        lengthMinutes: 90,
        posterImage: "/poster.jpg",
        rating: 9.1,
      },
    ]);

    const result = await fetchMovieById(5);

    expect(result).toEqual({
      id: 5,
      title: "Target",
      description: "Desc",
      year: 2024,
      lengthMinutes: 90,
      posterImage: "http://localhost:3022/poster.jpg",
      rating: 9.1,
    });
  });

  it("maps movie sessions", async () => {
    vi.mocked(MoviesService.getMoviesSessions).mockResolvedValue([
      {
        id: 1,
        movieId: 2,
        cinemaId: 3,
        startTime: "2025-03-21T10:00:00.000Z",
      },
    ]);

    const { fetchMovieSessions } = await import("../movie.api");
    const result = await fetchMovieSessions(2);

    expect(result).toEqual([
      {
        id: 1,
        movieId: 2,
        cinemaId: 3,
        startTime: "2025-03-21T10:00:00.000Z",
      },
    ]);
  });

  it("returns null poster when missing", async () => {
    vi.mocked(MoviesService.getMovies).mockResolvedValue([
      {
        id: undefined,
        title: undefined,
        description: undefined,
        year: undefined,
        lengthMinutes: undefined,
        posterImage: undefined,
        rating: undefined,
      },
    ]);

    const result = await fetchMovies();

    expect(result).toEqual([
      {
        id: 0,
        title: "",
        description: "",
        year: 0,
        lengthMinutes: 0,
        posterImage: null,
        rating: 0,
      },
    ]);
  });

  it("returns original poster url when parsing fails", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.mocked(MoviesService.getMovies).mockResolvedValue([
      {
        id: 1,
        title: "Movie",
        description: "Desc",
        year: 2024,
        lengthMinutes: 120,
        posterImage: "http://[invalid",
        rating: 8.5,
      },
    ]);

    const result = await fetchMovies();

    expect(result[0]?.posterImage).toBe("http://[invalid");
    warn.mockRestore();
  });
});
