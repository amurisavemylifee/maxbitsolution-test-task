<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/entities/auth'
import { useSessionDetails } from '@/entities/session'
import { useMovies } from '@/entities/movie'
import { useCinemas } from '@/entities/cinema'
import SelectSeats from '@/features/sessions/select-seats/SelectSeats.vue'
import BookSeatsButton from '@/features/sessions/book-seats/BookSeatsButton.vue'
import AppButton from '@/shared/components/ui/AppButton.vue'
import type { SeatCoordinate } from '@/entities/session'

const route = useRoute()
const router = useRouter()
const sessionId = Number(route.params.id)

if (Number.isNaN(sessionId)) {
  router.replace({ name: 'movies' })
}

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const {
  session,
  layout,
  bookedSeats,
  isLoading,
  error,
  loadDetails,
} = useSessionDetails(sessionId)

const { movies, loadMovies } = useMovies()
const { cinemas, loadCinemas } = useCinemas()

onMounted(() => {
  void loadMovies()
  void loadCinemas()
})

const selectedSeats = ref<SeatCoordinate[]>([])

watch(isAuthenticated, (value) => {
  if (!value) {
    selectedSeats.value = []
  }
})

const movieInfo = computed(() => {
  if (!session.value) return null
  return movies.value.find((movie) => movie.id === session.value?.movieId) ?? null
})

const cinemaInfo = computed(() => {
  if (!session.value) return null
  return cinemas.value.find((cinema) => cinema.id === session.value?.cinemaId) ?? null
})

const sessionDateLabel = computed(() => {
  if (!session.value) return ''
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(session.value.startTime))
})

const sessionTimeLabel = computed(() => {
  if (!session.value) return ''
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(session.value.startTime))
})

const loginLink = computed(() => ({
  name: 'login',
  query: { redirect: route.fullPath },
}))

const selectedSeatsLabels = computed(() =>
  selectedSeats.value.map((seat) => `Ряд ${seat.rowNumber}, место ${seat.seatNumber}`)
)

function handleSeatSelectionBlocked() {
  router.push({
    name: 'register',
    query: { redirect: route.fullPath },
  })
}
</script>

<template>
  <section class="page">
    <RouterLink class="page__back" :to="{ name: 'movies' }">← Назад к фильмам</RouterLink>

    <div v-if="isLoading" class="page__status">Загрузка информации о сеансе...</div>
    <div v-else-if="error" class="page__status page__status--error">
      {{ error }}
      <AppButton variant="secondary" @click="loadDetails">Повторить</AppButton>
    </div>
    <div v-else-if="!session || !layout" class="page__status">
      Информация о сеансе недоступна.
    </div>
    <div v-else class="session">
      <header class="session__header">
        <div>
          <h1>{{ movieInfo?.title ?? 'Фильм' }}</h1>
          <p class="session__meta">
            <span>{{ cinemaInfo?.name ?? 'Кинотеатр' }}</span>
            <span>{{ cinemaInfo?.address }}</span>
            <span>{{ sessionDateLabel }} в {{ sessionTimeLabel }}</span>
          </p>
        </div>
      </header>

      <div class="session__content">
        <SelectSeats
          v-model="selectedSeats"
          :layout="layout"
          :booked-seats="bookedSeats"
          :interactive="isAuthenticated"
          @interaction-blocked="handleSeatSelectionBlocked"
        />

        <div class="session__aside">
          <div class="session__summary">
            <h2>Выбор мест</h2>
            <p v-if="!isAuthenticated" class="session__summary-note">
              Авторизуйтесь, чтобы выбрать места и забронировать билеты.
            </p>
            <ul v-else-if="selectedSeatsLabels.length" class="session__selected">
              <li v-for="label in selectedSeatsLabels" :key="label">{{ label }}</li>
            </ul>
            <p v-else-if="isAuthenticated" class="session__summary-note">
              Выберите одно или несколько мест на схеме зала.
            </p>
          </div>

          <div class="session__actions">
            <AppButton
              v-if="!isAuthenticated"
              variant="secondary"
              @click="router.push(loginLink)"
            >
              Войти, чтобы забронировать
            </AppButton>
            <BookSeatsButton
              v-else
              :session-id="sessionId"
              :seats="selectedSeats"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page__back {
  color: var(--color-text-secondary);
}

.page__status {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--color-text-secondary);
}

.page__status--error {
  color: #ff6b6b;
}

.session {
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
  background-color: var(--color-surface);
}

.session__header h1 {
  margin: 0 0 12px;
  font-size: 32px;
}

.session__meta {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--color-text-secondary);
}

.session__content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
}

.session__aside {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.session__summary h2 {
  margin: 0 0 12px;
  font-size: 20px;
}

.session__summary-note {
  margin: 0;
  color: var(--color-text-secondary);
}

.session__selected {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.session__actions {
  display: flex;
  justify-content: center;
}

@media (max-width: 960px) {
  .session__content {
    grid-template-columns: 1fr;
  }
}
</style>
