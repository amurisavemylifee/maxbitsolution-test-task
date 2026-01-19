export interface ValidationResult {
  valid: boolean
  message?: string
}

export function validateUsername(value: string): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { valid: false, message: 'Введите логин' }
  }

  if (value.trim().length < 8) {
    return { valid: false, message: 'Логин должен содержать минимум 8 символов' }
  }

  return { valid: true }
}

export function validatePassword(value: string): ValidationResult {
  if (!value) {
    return { valid: false, message: 'Введите пароль' }
  }

  if (value.length < 8) {
    return { valid: false, message: 'Пароль должен содержать минимум 8 символов' }
  }

  if (!/[A-ZА-Я]/.test(value)) {
    return { valid: false, message: 'Пароль должен содержать хотя бы одну заглавную букву' }
  }

  if (!/\d/.test(value)) {
    return { valid: false, message: 'Пароль должен содержать хотя бы одну цифру' }
  }

  return { valid: true }
}

export function validatePasswordConfirmation(password: string, confirmation: string): ValidationResult {
  if (!confirmation) {
    return { valid: false, message: 'Подтвердите пароль' }
  }

  if (password !== confirmation) {
    return { valid: false, message: 'Пароли должны совпадать' }
  }

  return { valid: true }
}

export function validateSeatSelection<T>(seats: T[]): ValidationResult {
  if (!seats.length) {
    return { valid: false, message: 'Выберите хотя бы одно место' }
  }

  return { valid: true }
}
