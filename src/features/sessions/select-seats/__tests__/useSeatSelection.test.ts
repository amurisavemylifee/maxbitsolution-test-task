import { describe, expect, it } from "vitest";
import { nextTick, ref } from "vue";
import { useSeatSelection } from "../useSeatSelection";

describe("useSeatSelection", () => {
  it("toggles seats and ignores booked ones", () => {
    const booked = ref([{ rowNumber: 1, seatNumber: 1 }]);
    const { selectedSeats, toggleSeat } = useSeatSelection({
      bookedSeats: booked,
    });

    toggleSeat({ rowNumber: 1, seatNumber: 1 });
    expect(selectedSeats.value).toHaveLength(0);

    toggleSeat({ rowNumber: 1, seatNumber: 2 });
    expect(selectedSeats.value).toHaveLength(1);

    toggleSeat({ rowNumber: 1, seatNumber: 2 });
    expect(selectedSeats.value).toHaveLength(0);
  });

  it("keeps initial selection as provided", () => {
    const booked = ref([{ rowNumber: 1, seatNumber: 1 }]);
    const { selectedSeats } = useSeatSelection({
      bookedSeats: booked,
      initialSelection: [
        { rowNumber: 1, seatNumber: 1 },
        { rowNumber: 1, seatNumber: 2 },
      ],
    });

    expect(selectedSeats.value).toEqual([
      { rowNumber: 1, seatNumber: 1 },
      { rowNumber: 1, seatNumber: 2 },
    ]);
  });

  it("replaces selection with filtered list", () => {
    const booked = ref([{ rowNumber: 1, seatNumber: 2 }]);
    const { selectedSeats, setSelection } = useSeatSelection({
      bookedSeats: booked,
    });

    setSelection([
      { rowNumber: 1, seatNumber: 1 },
      { rowNumber: 1, seatNumber: 2 },
    ]);

    expect(selectedSeats.value).toEqual([{ rowNumber: 1, seatNumber: 1 }]);
  });

  it("skips update when selection unchanged", () => {
    const booked = ref([]);
    const { selectedSeats, setSelection } = useSeatSelection({
      bookedSeats: booked,
      initialSelection: [{ rowNumber: 1, seatNumber: 1 }],
    });

    const previous = selectedSeats.value;
    setSelection([{ rowNumber: 1, seatNumber: 1 }]);

    expect(selectedSeats.value).toBe(previous);
  });

  it("keeps selection when booked seats change without overlap", async () => {
    const booked = ref([{ rowNumber: 1, seatNumber: 1 }]);
    const { selectedSeats, toggleSeat } = useSeatSelection({
      bookedSeats: booked,
    });

    toggleSeat({ rowNumber: 1, seatNumber: 2 });
    const previous = selectedSeats.value;

    booked.value = [...booked.value, { rowNumber: 1, seatNumber: 3 }];
    await nextTick();

    expect(selectedSeats.value).toBe(previous);
    expect(selectedSeats.value).toHaveLength(1);
  });

  it("resets selection", () => {
    const booked = ref([]);
    const { selectedSeats, reset, toggleSeat } = useSeatSelection({
      bookedSeats: booked,
    });

    toggleSeat({ rowNumber: 1, seatNumber: 1 });
    expect(selectedSeats.value).toHaveLength(1);

    reset();
    expect(selectedSeats.value).toHaveLength(0);
  });

  it("drops seats when they become booked", async () => {
    const booked = ref([{ rowNumber: 1, seatNumber: 1 }]);
    const { selectedSeats, toggleSeat } = useSeatSelection({
      bookedSeats: booked,
    });

    toggleSeat({ rowNumber: 1, seatNumber: 3 });
    expect(selectedSeats.value).toHaveLength(1);

    booked.value = [...booked.value, { rowNumber: 1, seatNumber: 3 }];
    await nextTick();
    expect(selectedSeats.value).toHaveLength(0);
  });
});
