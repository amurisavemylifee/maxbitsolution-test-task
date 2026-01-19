<script setup lang="ts">
import AuthLayout from '@/widgets/auth/AuthLayout.vue'
import LoginForm from '@/features/auth/login/LoginForm.vue'
import AppLink from '@/shared/components/ui/AppLink.vue'
</script>

<template>
  <AuthLayout>
    <LoginForm />
    <div class="auth-page__footer">
      <span>Если у вас нет аккаунта</span>
      <AppLink to="/auth/register">зарегистрируйтесь</AppLink>
    </div>
  </AuthLayout>
</template>

<style scoped>
.auth-page__footer {
  margin-top: 24px;
  display: flex;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-secondary);
}
</style>
