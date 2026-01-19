<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  target: string
}>()

const emit = defineEmits<{
  (event: 'expired'): void
}>()

const remaining = ref(0)
let intervalId: number | undefined

function calculateRemaining() {
  const targetTime = new Date(props.target).getTime()
  const now = Date.now()
  return Math.max(targetTime - now, 0)
}

function tick() {
  remaining.value = calculateRemaining()

  if (remaining.value === 0) {
    emit('expired')
    clearInterval(intervalId)
  }
}

onMounted(() => {
  tick()
  intervalId = window.setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

watch(
  () => props.target,
  () => {
    tick()
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = window.setInterval(tick, 1000)
    }
  }
)

const formatted = computed(() => {
  const totalSeconds = Math.floor(remaining.value / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
  <span class="timer">{{ formatted }}</span>
</template>

<style scoped>
.timer {
  font-variant-numeric: tabular-nums;
}
</style>
