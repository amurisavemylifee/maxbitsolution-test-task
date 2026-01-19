import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import { flushPromises } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/entities/auth";
import LoginForm from "../LoginForm.vue";

vi.mock("@/entities/auth", async () => {
  const actual =
    await vi.importActual<typeof import("@/entities/auth")>("@/entities/auth");
  return {
    ...actual,
    login: vi.fn(),
  };
});

describe("LoginForm e2e", () => {
  it("logs in and redirects to requested page", async () => {
    const localRoutes = [
      {
        path: "/auth/login",
        name: "login",
        component: { template: "<div />" },
      },
      {
        path: "/tickets",
        name: "tickets",
        component: { template: "<div />" },
      },
    ];

    const router = createRouter({
      history: createMemoryHistory(),
      routes: localRoutes,
    });

    const pinia = createPinia();
    setActivePinia(pinia);

    await router.push("/auth/login?redirect=/tickets");
    await router.isReady();

    const authStore = useAuthStore();
    const { login } = await import("@/entities/auth");
    vi.mocked(login).mockResolvedValue({ token: "token-1" });

    const { getByPlaceholderText, getByText } = render(LoginForm, {
      global: {
        plugins: [router, pinia],
      },
    });

    await fireEvent.update(getByPlaceholderText("Введите логин"), "username");
    await fireEvent.update(getByPlaceholderText("Введите пароль"), "Password1");
    const form = getByText("Войти").closest("form") as HTMLFormElement;
    await fireEvent.submit(form);

    await flushPromises();
    await router.isReady();

    expect(authStore.token).toBe("token-1");
    expect(router.currentRoute.value.fullPath).toBe("/tickets");
  });
});
