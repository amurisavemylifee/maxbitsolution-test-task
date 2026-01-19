<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    type?: string
    placeholder?: string
    disabled?: boolean
    error?: string | null
    autocomplete?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    disabled: false,
    error: null,
    autocomplete: 'off',
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'blur'): void
  (event: 'focus'): void
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :type="type"
    class="text-field"
    :class="{ 'text-field--error': !!error }"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :autocomplete="autocomplete"
    @input="onInput"
    @blur="emit('blur')"
    @focus="emit('focus')"
  />
</template>

<style scoped>
.text-field {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: transparent;
  color: var(--color-text-primary);
  font-size: 16px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.text-field:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.08);
}

.text-field--error {
  border-color: #d35454;
}
</style>
