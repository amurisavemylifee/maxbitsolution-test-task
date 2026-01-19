<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to: string
    variant?: 'primary' | 'secondary' | 'nav'
  }>(),
  {
    variant: 'primary',
  }
)
</script>

<template>
  <RouterLink class="link" :class="`link--${variant}`" :to="props.to">
    <slot />
  </RouterLink>
</template>

<style scoped>
.link {
  color: var(--color-text-secondary);
  text-decoration: underline;
}

.link--primary {
  color: var(--color-accent);
}

.link--secondary {
  color: var(--color-text-secondary);
}

.link--nav {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.link--nav:hover,
.link--nav.router-link-active,
.link--nav.router-link-exact-active {
  border-color: var(--color-border);
  color: var(--color-text-primary);
}
</style>
