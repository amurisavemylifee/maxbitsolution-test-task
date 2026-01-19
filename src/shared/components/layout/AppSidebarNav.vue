<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/entities/auth'
import AppButton from '@/shared/components/ui/AppButton.vue'
import AppLink from '@/shared/components/ui/AppLink.vue'

const router = useRouter()
const authStore = useAuthStore()

const navItems = computed(() => {
  if (authStore.isAuthenticated) {
    return [
      { label: 'Фильмы', to: '/movies' },
      { label: 'Кинотеатры', to: '/cinemas' },
      { label: 'Мои билеты', to: '/tickets' },
      { label: 'Выход', to: '/logout', action: 'logout' as const },
    ]
  }

  return [
    { label: 'Фильмы', to: '/movies' },
    { label: 'Кинотеатры', to: '/cinemas' },
    { label: 'Мои билеты', to: '/auth/login?redirect=/tickets' },
    { label: 'Вход', to: '/auth/login' },
  ]
})

function handleNavigation(item: (typeof navItems)['value'][number]) {
  if (item.action === 'logout') {
    authStore.clearAuth()
    router.push('/movies')
    return
  }
}
</script>

<template>
  <aside class="sidebar">
    <h1 class="sidebar__title">Cinema</h1>
    <nav class="sidebar__nav">
      <template v-for="item in navItems" :key="item.label">
        <AppLink v-if="!item.action" :to="item.to" variant="nav">
          {{ item.label }}
        </AppLink>
        <AppButton v-else variant="nav" @click="handleNavigation(item)">
          {{ item.label }}
        </AppButton>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  border-right: 1px solid var(--color-border);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.sidebar__title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

</style>
