import { getApiBaseUrl } from '@/shared/config/env'
import { OpenAPI } from './generated'

type TokenProvider = () => string | null

let tokenProvider: TokenProvider = () => null

OpenAPI.BASE = getApiBaseUrl()
OpenAPI.TOKEN = () => Promise.resolve(tokenProvider() ?? '')

export function setTokenProvider(provider: TokenProvider) {
  tokenProvider = provider
}

export * from './generated'
