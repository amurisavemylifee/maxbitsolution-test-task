<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    status: 'available' | 'selected' | 'booked'
    label: string
  }>(),
  {
    status: 'available',
  }
)

const emit = defineEmits<{
  (event: 'select'): void
}>()
</script>

<template>
  <button
    type="button"
    class="seat"
    :class="{
      'seat--available': props.status === 'available',
      'seat--selected': props.status === 'selected',
      'seat--booked': props.status === 'booked',
    }"
    :data-status="props.status"
    :disabled="props.status === 'booked'"
    @click="emit('select')"
  >
    <span class="visually-hidden">{{ label }}</span>
  </button>
</template>

<style scoped>
.seat {
  --seat-selected-bg: #4c6ef5;
  --seat-selected-border: #7995ff;
  --seat-booked-bg: rgba(235, 87, 87, 0.35);
  --seat-booked-border: rgba(235, 87, 87, 0.8);

  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.seat--available:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.seat--selected {
  background-color: var(--seat-selected-bg);
  border-color: var(--seat-selected-border);
}

.seat--booked {
  background-color: var(--seat-booked-bg);
  border-color: var(--seat-booked-border);
  cursor: not-allowed;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
