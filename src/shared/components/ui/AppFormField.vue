<script setup lang="ts">
defineProps<{
  label: string
  forId: string
  message?: string | null
  error?: string | null
}>()
</script>

<template>
  <label class="field" :for="forId">
    <span class="field__label">{{ label }}</span>
    <slot />
    <span v-if="error" class="field__error">{{ error }}</span>
    <span v-else-if="message" class="field__message">{{ message }}</span>
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.field__label {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.field__error {
  font-size: 12px;
  color: #ff6b6b;
}

.field__message {
  font-size: 12px;
  color: var(--color-text-secondary);
}
</style>
