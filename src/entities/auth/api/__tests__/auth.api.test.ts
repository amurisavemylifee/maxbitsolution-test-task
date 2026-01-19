import { describe, expect, it, vi } from "vitest";
import { login, register } from "../auth.api";
import { AuthService } from "@/shared/api";

vi.mock("@/shared/api", () => ({
  AuthService: {
    postLogin: vi.fn(),
    postRegister: vi.fn(),
  },
}));

describe("auth api", () => {
  it("logs in with credentials", async () => {
    vi.mocked(AuthService.postLogin).mockResolvedValue({ token: "token-1" });

    const result = await login({ username: "user", password: "Password1" });

    expect(AuthService.postLogin).toHaveBeenCalledWith({
      requestBody: { username: "user", password: "Password1" },
    });
    expect(result).toEqual({ token: "token-1" });
  });

  it("throws when register response has no token", async () => {
    vi.mocked(AuthService.postRegister).mockResolvedValue({});

    await expect(
      register({
        username: "user",
        password: "Password1",
        passwordConfirmation: "Password1",
      }),
    ).rejects.toThrow("Токен авторизации не получен");
  });

  it("throws when login response has no token", async () => {
    vi.mocked(AuthService.postLogin).mockResolvedValue({});

    await expect(
      login({ username: "user", password: "Password1" }),
    ).rejects.toThrow("Токен авторизации не получен");
  });
});
