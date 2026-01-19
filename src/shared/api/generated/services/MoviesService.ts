/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Movie } from '../models/Movie';
import type { MovieSession } from '../models/MovieSession';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MoviesService {
  /**
   * Получить список фильмов
   * Возвращает список всех доступных фильмов.
   * @returns Movie Список фильмов
   * @throws ApiError
   */
  public static getMovies(): CancelablePromise<Array<Movie>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/movies',
    });
  }
  /**
   * Получить список киносеансов для фильма
   * Возвращает список всех доступных киносеансов для указанного фильма.
   * @returns MovieSession Список киносеансов с фильмом
   * @throws ApiError
   */
  public static getMoviesSessions({
    movieId,
  }: {
    movieId: number,
  }): CancelablePromise<Array<MovieSession>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/movies/{movieId}/sessions',
      path: {
        'movieId': movieId,
      },
      errors: {
        404: `Фильм не найден`,
      },
    });
  }
}
