<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'nav'
type ButtonKind = 'button' | 'a'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    isActive?: boolean
    kind?: ButtonKind
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
    isActive: false,
    kind: 'button',
  }
)

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void
}>()

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)
}

const classes = computed(() => [
  `button--${props.variant}`,
  { 'button--active': props.isActive },
])
</script>

<template>
  <component :is="kind"
    :type="type"
    class="button"
    :class="classes"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<style scoped>
.button {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  background-color: transparent;
  color: var(--color-text-primary);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button--primary {
  background-color: var(--color-accent);
  color: #000;
}

.button--primary:not(:disabled):hover {
  background-color: rgba(255, 255, 255, 0.85);
}

.button--secondary {
  border-color: var(--color-border);
}

.button--secondary:not(:disabled):hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.button--nav {
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border-radius: 8px;
  border-color: transparent;
  background-color: transparent;
  color: var(--color-text-secondary);
}

.button--nav:not(:disabled):hover {
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.button--nav.button--active {
  border-color: var(--color-border);
  color: var(--color-text-primary);
}
</style>
