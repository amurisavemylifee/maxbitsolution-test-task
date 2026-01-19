import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/shared/test/setupTests.ts",
    coverage: {
      provider: "v8",
      include: [
        "src/app/providers/router/guards.ts",
        "src/entities/auth/api/auth.api.ts",
        "src/entities/auth/model/auth.store.ts",
        "src/entities/booking/api/booking.api.ts",
        "src/entities/booking/model/useBookings.ts",
        "src/entities/cinema/api/cinema.api.ts",
        "src/entities/movie/api/movie.api.ts",
        "src/entities/session/api/session.api.ts",
        "src/entities/session/model/session.helpers.ts",
        "src/entities/session/model/useSessionDetails.ts",
        "src/features/sessions/select-seats/useSeatSelection.ts",
        "src/shared/utils/validation.ts",
      ],
      exclude: [
        "src/**/__tests__/**",
        "src/**/*.d.ts",
        "src/shared/api/generated/**",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
