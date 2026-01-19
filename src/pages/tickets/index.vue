<script setup lang="ts">
import { computed, onMounted } from 'vue'
import BookingGroup from '@/widgets/bookings/BookingGroup.vue'
import { useAuthStore } from '@/entities/auth'
import { useBookings } from '@/entities/booking'
import { useMovies } from '@/entities/movie'
import { useCinemas } from '@/entities/cinema'
import { useSessionLookup } from '@/entities/session/model/sessionLookup'
import AppButton from '@/shared/components/ui/AppButton.vue'

const authStore = useAuthStore()
const { movies, loadMovies } = useMovies()
const { cinemas, loadCinemas } = useCinemas()
const sessionLookup = useSessionLookup()

const {
  grouped,
  isLoading,
  error,
  loadAll,
  pay,
  removeBooking,
} = useBookings(() => ({
  movies: movies.value,
  cinemas: cinemas.value,
  sessions: sessionLookup.cache.value,
}))

onMounted(() => {
  if (!authStore.isAuthenticated) {
    return
  }

  void loadMovies()
  void loadCinemas()
  void loadAll()
})

const hasDataLoaded = computed(
  () => !isLoading.value && !!grouped.value
)
</script>

<template>
  <section class="page">
    <header class="page__header">
      <h1>Мои билеты</h1>
      <AppButton variant="secondary" @click="loadAll">Обновить</AppButton>
    </header>

    <div v-if="isLoading" class="page__status">Загрузка ваших билетов...</div>
    <div v-else-if="error" class="page__status page__status--error">{{ error }}</div>
    <div v-else-if="!hasDataLoaded" class="page__status">Нет данных.</div>
    <div v-else class="tickets">
      <BookingGroup
        title="Неоплаченные"
        :bookings="grouped.unpaid"
        showTimer
        @pay="pay"
        @expired="removeBooking"
      />

      <BookingGroup title="Будущие" :bookings="grouped.upcoming" />

      <BookingGroup title="Прошедшие" :bookings="grouped.past" />
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page__header h1 {
  margin: 0;
  font-size: 32px;
}

.page__status {
  color: var(--color-text-secondary);
}

.page__status--error {
  color: #ff6b6b;
}

.tickets {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
