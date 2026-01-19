const isBrowser = () => typeof window !== 'undefined'

export function readFromStorage(key: string): string | null {
  if (!isBrowser()) {
    return null
  }

  try {
    return window.localStorage.getItem(key)
  } catch (error) {
    console.warn('Failed to read from storage', error)
    return null
  }
}

export function saveToStorage(key: string, value: string) {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.setItem(key, value)
  } catch (error) {
    console.warn('Failed to save to storage', error)
  }
}

export function removeFromStorage(key: string) {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn('Failed to remove from storage', error)
  }
}
