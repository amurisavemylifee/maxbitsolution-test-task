<script setup lang="ts">
import AppButton from '@/shared/components/ui/AppButton.vue'
import { useAuthStore } from '@/entities/auth'

const authStore = useAuthStore()

function handleLogout() {
  authStore.clearAuth()
}
</script>

<template>
  <AppButton variant="secondary" @click="handleLogout">Выйти</AppButton>
</template>
