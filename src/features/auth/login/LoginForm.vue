<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppFormField from '@/shared/components/ui/AppFormField.vue'
import AppTextField from '@/shared/components/ui/AppTextField.vue'
import AppButton from '@/shared/components/ui/AppButton.vue'
import { validatePassword, validateUsername } from '@/shared/utils/validation'
import { login, useAuthStore } from '@/entities/auth'
import { normalizeApiError } from '@/shared/api/normalizeApiError'

const state = reactive({
  username: '',
  password: '',
  isSubmitting: false,
  error: '',
  touched: {
    username: false,
    password: false,
  },
})

const usernameError = computed(() => {
  if (!state.touched.username) return ''
  const result = validateUsername(state.username)
  return result.valid ? '' : result.message ?? ''
})

const passwordError = computed(() => {
  if (!state.touched.password) return ''
  const result = validatePassword(state.password)
  return result.valid ? '' : result.message ?? ''
})

const isFormValid = computed(() => {
  return validateUsername(state.username).valid && validatePassword(state.password).valid
})

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleSubmit() {
  state.touched.username = true
  state.touched.password = true

  if (!isFormValid.value || state.isSubmitting) {
    return
  }

  state.isSubmitting = true
  state.error = ''

  try {
    const response = await login({ username: state.username.trim(), password: state.password })
    authStore.setAuthToken(response.token)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/tickets'
    await router.push(redirect)
  } catch (error) {
    const normalized = normalizeApiError(error)
    state.error =
      normalized.payload?.message ??
      'Неверный логин или пароль. Проверьте введенные данные и попробуйте снова'
  } finally {
    state.isSubmitting = false
  }
}
</script>

<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <h2 class="auth-form__title">Вход</h2>

    <AppFormField label="Логин" for-id="login-username" :error="usernameError">
      <AppTextField
        id="login-username"
        v-model="state.username"
        autocomplete="username"
        placeholder="Введите логин"
        :error="usernameError"
        @blur="state.touched.username = true"
      />
    </AppFormField>

    <AppFormField label="Пароль" for-id="login-password" :error="passwordError">
      <AppTextField
        id="login-password"
        v-model="state.password"
        type="password"
        autocomplete="current-password"
        placeholder="Введите пароль"
        :error="passwordError"
        @blur="state.touched.password = true"
      />
    </AppFormField>

    <p v-if="state.error" class="auth-form__error">{{ state.error }}</p>

    <AppButton type="submit" :disabled="!isFormValid || state.isSubmitting">
      {{ state.isSubmitting ? 'Вход...' : 'Войти' }}
    </AppButton>
  </form>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
}

.auth-form__title {
  margin: 0 0 8px;
  font-size: 28px;
}

.auth-form__error {
  color: #ff6b6b;
  font-size: 14px;
}
</style>
