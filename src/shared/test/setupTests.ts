import { config } from '@vue/test-utils'

config.global.stubs = {
  transition: false,
  'router-link': {
    template: '<a><slot /></a>',
  },
}

if (typeof window !== 'undefined' && typeof window.localStorage?.clear !== 'function') {
  const store = new Map<string, string>()

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem(key: string) {
        return store.get(key) ?? null
      },
      setItem(key: string, value: string) {
        store.set(String(key), String(value))
      },
      removeItem(key: string) {
        store.delete(key)
      },
      clear() {
        store.clear()
      },
    },
    configurable: true,
  })
}
