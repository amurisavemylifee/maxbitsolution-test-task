<script setup lang="ts">
import AppSidebarNav from './AppSidebarNav.vue'
</script>

<template>
  <div class="layout">
    <AppSidebarNav />
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.layout__content {
  flex: 1;
  padding: 32px 48px;
}
</style>
