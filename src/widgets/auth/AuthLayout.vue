<script setup lang="ts">
</script>

<template>
  <div class="auth-layout">
    <div class="auth-layout__card">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-layout__card {
  width: 100%;
  max-width: 520px;
  padding: 40px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background-color: var(--color-surface);
}
</style>
