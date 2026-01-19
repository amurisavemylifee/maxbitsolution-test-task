import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('@/pages/movies/index.vue'),
  },
  {
    path: '/movies/:id',
    name: 'movie-details',
    component: () => import('@/pages/movies/[id]/index.vue'),
  },
  {
    path: '/cinemas',
    name: 'cinemas',
    component: () => import('@/pages/cinemas/index.vue'),
  },
  {
    path: '/cinemas/:id',
    name: 'cinema-details',
    component: () => import('@/pages/cinemas/[id]/index.vue'),
  },
  {
    path: '/tickets',
    name: 'tickets',
    meta: { requiresAuth: true },
    component: () => import('@/pages/tickets/index.vue'),
  },
  {
    path: '/sessions/:id',
    name: 'session',
    component: () => import('@/pages/sessions/[id]/index.vue'),
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/pages/auth/login/index.vue'),
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/pages/auth/register/index.vue'),
  },
]
