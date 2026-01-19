import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import { mount, flushPromises } from "@vue/test-utils";
import { useSessionDetails } from "../useSessionDetails";
import * as sessionApi from "../../api/session.api";

vi.mock("../../api/session.api", () => ({
  fetchSessionDetails: vi.fn(),
}));

const TestComponent = defineComponent({
  props: {
    sessionId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = useSessionDetails(props.sessionId);
    return () =>
      h(
        "div",
        { "data-loaded": state.isLoading.value ? "0" : "1" },
        state.error.value ?? "",
      );
  },
});

describe("useSessionDetails", () => {
  it("loads session details on mount", async () => {
    vi.mocked(sessionApi.fetchSessionDetails).mockResolvedValue({
      id: 1,
      movieId: 2,
      cinemaId: 3,
      startTime: "2025-03-21T10:00:00.000Z",
      seats: { rows: 5, seatsPerRow: 6 },
      bookedSeats: [{ rowNumber: 1, seatNumber: 2 }],
    });

    const wrapper = mount(TestComponent, { props: { sessionId: 1 } });
    await flushPromises();
    await nextTick();

    expect(sessionApi.fetchSessionDetails).toHaveBeenCalledWith(1);
    expect(wrapper.text()).toBe("");
  });

  it("sets fallback error when loading fails", async () => {
    vi.mocked(sessionApi.fetchSessionDetails).mockRejectedValue(
      new Error("Network"),
    );

    const wrapper = mount(TestComponent, { props: { sessionId: 2 } });
    await flushPromises();
    await nextTick();

    expect(sessionApi.fetchSessionDetails).toHaveBeenCalledWith(2);
    expect(wrapper.text()).toBe("Не удалось загрузить информацию о сеансе");
  });
});
