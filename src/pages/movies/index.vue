<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMovies } from '@/entities/movie'
import MoviesList from '@/widgets/movies/MoviesList.vue'

const router = useRouter()
const { movies, isLoading, error } = useMovies()

function handleViewSessions(movieId: number) {
  router.push({ name: 'movie-details', params: { id: movieId } })
}
</script>

<template>
  <section class="page">
    <MoviesList :movies="movies" :is-loading="isLoading" :error="error" @view-sessions="handleViewSessions" />
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
