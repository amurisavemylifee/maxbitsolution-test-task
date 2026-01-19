/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cinema } from '../models/Cinema';
import type { MovieSession } from '../models/MovieSession';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CinemasService {
  /**
   * Получить список кинотеатров
   * Возвращает список всех доступных кинотеатров.
   * @returns Cinema Список кинотеатров
   * @throws ApiError
   */
  public static getCinemas(): CancelablePromise<Array<Cinema>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/cinemas',
    });
  }
  /**
   * Получить сеансы для кинотеатра
   * Возвращает список всех доступных сеансов для указанного кинотеатра.
   * @returns MovieSession Список киносеансов
   * @throws ApiError
   */
  public static getCinemasSessions({
    cinemaId,
  }: {
    cinemaId: number,
  }): CancelablePromise<Array<MovieSession>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/cinemas/{cinemaId}/sessions',
      path: {
        'cinemaId': cinemaId,
      },
      errors: {
        404: `Кинотеатр не найден`,
      },
    });
  }
}
