import { describe, expect, it } from "vitest";
import { groupSessionsByDate } from "../session.helpers";
import type { SessionDto } from "../session.types";

const sessions: SessionDto[] = [
  { id: 1, movieId: 1, cinemaId: 10, startTime: "2025-03-20T12:00:00.000Z" },
  { id: 2, movieId: 2, cinemaId: 20, startTime: "2025-03-20T15:00:00.000Z" },
  { id: 3, movieId: 1, cinemaId: 10, startTime: "2025-03-21T18:30:00.000Z" },
];

describe("groupSessionsByDate", () => {
  it("groups sessions by date and lookup entity", () => {
    const groups = groupSessionsByDate(
      sessions,
      (session) => session.cinemaId,
      {
        entityLookup: {
          10: "Cinema One",
          20: "Cinema Two",
        },
        fallbackName: "Unknown",
      },
    );

    expect(groups).toHaveLength(2);

    const firstGroup = groups[0];
    expect(firstGroup?.dateLabel).toBe("20.03");
    expect(firstGroup?.items.length).toBe(2);
    expect(firstGroup?.items[0]?.entityName).toBe("Cinema One");
    expect(firstGroup?.items[0]?.slots.length).toBe(1);

    const secondGroupFirstSlot = groups[1]?.items[0]?.slots[0];
    expect(secondGroupFirstSlot?.timeLabel).toBeDefined();
  });

  it("uses fallback name when lookup missing", () => {
    const groups = groupSessionsByDate(
      sessions,
      (session) => session.cinemaId,
      {
        entityLookup: {
          10: "Cinema One",
        },
        fallbackName: "Unknown",
      },
    );

    const firstGroup = groups.find((group) => group.dateLabel === "20.03");
    const unknownItem = firstGroup?.items.find(
      (item) => item.entityName === "Unknown",
    );
    expect(unknownItem).toBeTruthy();
  });

  it("sorts entities and slots", () => {
    const shuffled: SessionDto[] = [
      {
        id: 2,
        movieId: 2,
        cinemaId: 20,
        startTime: "2025-03-20T15:00:00.000Z",
      },
      {
        id: 1,
        movieId: 1,
        cinemaId: 10,
        startTime: "2025-03-20T12:00:00.000Z",
      },
      {
        id: 4,
        movieId: 3,
        cinemaId: 20,
        startTime: "2025-03-20T09:00:00.000Z",
      },
    ];

    const groups = groupSessionsByDate(
      shuffled,
      (session) => session.cinemaId,
      {
        entityLookup: {
          10: "Alpha",
          20: "Beta",
        },
        fallbackName: "Unknown",
      },
    );

    const group = groups[0];
    expect(group?.items[0]?.entityName).toBe("Alpha");
    expect(group?.items[1]?.entityName).toBe("Beta");
    expect(group?.items[1]?.slots[0]?.id).toBe(4);
  });

  it("returns empty list for empty sessions", () => {
    const groups = groupSessionsByDate([], (session) => session.cinemaId, {
      entityLookup: {},
      fallbackName: "Unknown",
    });

    expect(groups).toHaveLength(0);
  });

  it("handles large datasets within reasonable time", () => {
    const largeSessions: SessionDto[] = Array.from(
      { length: 4000 },
      (_, index) => ({
        id: index + 1,
        movieId: (index % 5) + 1,
        cinemaId: (index % 3) + 1,
        startTime: `2025-03-${String((index % 28) + 1).padStart(2, "0")}T10:00:00.000Z`,
      }),
    );

    const start = Date.now();
    const groups = groupSessionsByDate(
      largeSessions,
      (session) => session.cinemaId,
      {
        entityLookup: {
          1: "Cinema A",
          2: "Cinema B",
          3: "Cinema C",
        },
        fallbackName: "Unknown",
      },
    );
    const duration = Date.now() - start;

    expect(groups.length).toBeGreaterThan(0);
    expect(duration).toBeLessThan(1200);
  });
});
