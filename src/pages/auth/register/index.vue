<script setup lang="ts">
import AuthLayout from '@/widgets/auth/AuthLayout.vue'
import RegisterForm from '@/features/auth/register/RegisterForm.vue'
import AppLink from '@/shared/components/ui/AppLink.vue'
</script>

<template>
  <AuthLayout>
    <RegisterForm />
    <div class="auth-page__footer">
      <span>Если вы уже зарегистрированы</span>
      <AppLink to="/auth/login">войдите</AppLink>
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
