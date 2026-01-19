import type { AxiosError } from 'axios'
import { ApiError as GeneratedApiError } from './generated'
import type { NormalizedApiError, NormalizedApiErrorPayload } from './types'

function createNormalizedError(
  message: string,
  status?: number,
  payload?: NormalizedApiErrorPayload
): NormalizedApiError {
  const normalized: NormalizedApiError = new Error(message)
  if (typeof status === 'number') {
    normalized.status = status
  }
  if (payload) {
    normalized.payload = payload
  }
  return normalized
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (error instanceof GeneratedApiError) {
    const body = (typeof error.body === 'object' && error.body !== null
      ? (error.body as { message?: string; error?: string })
      : {})

    const payload: NormalizedApiErrorPayload = {
      message: body.message ?? error.message ?? 'Неизвестная ошибка',
      error: body.error,
    }

    return createNormalizedError(payload.message, error.status, payload)
  }

  if ((error as AxiosError)?.isAxiosError) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>
    const payload: NormalizedApiErrorPayload = {
      message: axiosError.response?.data?.message ?? axiosError.message ?? 'Неизвестная ошибка',
      error: axiosError.response?.data?.error,
    }

    return createNormalizedError(payload.message, axiosError.response?.status, payload)
  }

  if (error instanceof Error) {
    return error as NormalizedApiError
  }

  return createNormalizedError('Unexpected error', 0)
}
