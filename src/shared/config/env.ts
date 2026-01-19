export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  if (!baseUrl) {
    throw new Error('VITE_API_BASE_URL is not defined. Please check your environment configuration.')
  }

  return baseUrl
}
