import { render, fireEvent } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import MoviesList from '../MoviesList.vue'

const movies = [
  {
    id: 1,
    title: 'Фильм',
    description: 'Описание',
    year: 2024,
    lengthMinutes: 120,
    posterImage: null,
    rating: 8.5,
  },
]

describe('MoviesList', () => {
  it('renders loading state', () => {
    const { getByText } = render(MoviesList, {
      props: {
        movies: [],
        isLoading: true,
        error: null,
      },
    })

    expect(getByText('Загрузка...')).toBeTruthy()
  })

  it('renders error state', () => {
    const { getByText } = render(MoviesList, {
      props: {
        movies: [],
        isLoading: false,
        error: 'Ошибка загрузки',
      },
    })

    expect(getByText('Ошибка загрузки')).toBeTruthy()
  })

  it('renders empty state', () => {
    const { getByText } = render(MoviesList, {
      props: {
        movies: [],
        isLoading: false,
        error: null,
      },
    })

    expect(getByText('Нет доступных фильмов')).toBeTruthy()
  })

  it('renders movie cards', () => {
    const { getByText } = render(MoviesList, {
      props: {
        movies,
        isLoading: false,
        error: null,
      },
    })

    expect(getByText('Фильм')).toBeTruthy()
    expect(getByText('Посмотреть сеансы')).toBeTruthy()
  })

  it('emits viewSessions when button clicked', async () => {
    const onViewSessions = vi.fn()

    const { getByText } = render(MoviesList, {
      props: {
        movies,
        isLoading: false,
        error: null,
        onViewSessions,
      },
    })

    const button = getByText('Посмотреть сеансы')
    await fireEvent.click(button)

    expect(onViewSessions).toHaveBeenCalledWith(1)
  })
})
