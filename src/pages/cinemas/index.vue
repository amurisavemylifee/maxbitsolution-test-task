<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCinemas } from '@/entities/cinema'
import CinemasList from '@/widgets/cinemas/CinemasList.vue'

const router = useRouter()
const { cinemas, isLoading, error } = useCinemas()

function handleViewSessions(cinemaId: number) {
  router.push({ name: 'cinema-details', params: { id: cinemaId } })
}
</script>

<template>
  <section class="page">
    <CinemasList
      :cinemas="cinemas"
      :is-loading="isLoading"
      :error="error"
      @view-sessions="handleViewSessions"
    />
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
