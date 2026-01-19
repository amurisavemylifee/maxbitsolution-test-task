<script setup lang="ts">
import AppButton from '@/shared/components/ui/AppButton.vue'
import type { SessionDayGroup } from '@/entities/session'

defineProps<{
  groups: SessionDayGroup[]
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (event: 'selectSession', sessionId: number): void
}>()
</script>

<template>
  <section class="sessions">
    <h2>Сеансы</h2>

    <p v-if="isLoading" class="sessions__info">Загрузка сеансов...</p>
    <p v-else-if="error" class="sessions__info">{{ error }}</p>
    <p v-else-if="!groups.length" class="sessions__info">Нет доступных сеансов</p>

    <div v-else class="sessions__groups">
      <div v-for="group in groups" :key="group.dateKey" class="sessions__day">
        <h3 class="sessions__day-title">{{ group.dateLabel }}</h3>
        <div class="sessions__cinemas">
          <div v-for="item in group.items" :key="item.entityId" class="sessions__cinema">
            <div class="sessions__cinema-name">{{ item.entityName }}</div>
            <div class="sessions__slots">
              <AppButton
                v-for="slot in item.slots"
                :key="slot.id"
                variant="secondary"
                @click="emit('selectSession', slot.id)"
              >
                {{ slot.timeLabel }}
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sessions {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sessions__info {
  margin: 0;
  color: var(--color-text-secondary);
}

.sessions__groups {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sessions__day {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sessions__day-title {
  margin: 0;
  font-size: 20px;
}

.sessions__cinemas {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sessions__cinema {
  display: flex;
  gap: 16px;
  align-items: center;
}

.sessions__cinema-name {
  min-width: 200px;
  font-weight: 500;
}

.sessions__slots {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
