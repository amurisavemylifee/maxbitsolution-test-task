import { AuthService } from '@/shared/api'

export interface AuthResponse {
  token: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  passwordConfirmation: string
}

function ensureToken(response: { token?: string }): AuthResponse {
  if (!response.token) {
    throw new Error('Токен авторизации не получен')
  }

  return { token: response.token }
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await AuthService.postLogin({
    requestBody: {
      username: payload.username,
      password: payload.password,
    },
  })

  return ensureToken(response)
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await AuthService.postRegister({
    requestBody: {
      username: payload.username,
      password: payload.password,
    },
  })

  return ensureToken(response)
}
