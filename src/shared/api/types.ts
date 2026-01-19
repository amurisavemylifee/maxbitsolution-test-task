export interface NormalizedApiErrorPayload {
  message: string
  error?: string
}

export interface NormalizedApiError extends Error {
  status?: number
  payload?: NormalizedApiErrorPayload
}
