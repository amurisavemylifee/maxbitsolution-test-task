/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MovieSessionDetails } from '../models/MovieSessionDetails';
import type { Seat } from '../models/Seat';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MovieSessionsService {
  /**
   * Получить детали сеанса
   * Возвращает детальную информацию о сеансе, включая забронированные места.
   * @returns MovieSessionDetails Детали киносеанса
   * @throws ApiError
   */
  public static getMovieSessions({
    movieSessionId,
  }: {
    movieSessionId: number,
  }): CancelablePromise<MovieSessionDetails> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/movieSessions/{movieSessionId}',
      path: {
        'movieSessionId': movieSessionId,
      },
      errors: {
        404: `Сеанс не найден`,
      },
    });
  }
  /**
   * Забронировать места на киносеанс
   * Бронирует указанные места на киносеанс для аутентифицированного пользователя.
   * @returns any Бронирование успешно
   * @throws ApiError
   */
  public static postMovieSessionsBookings({
    movieSessionId,
    requestBody,
  }: {
    movieSessionId: number,
    requestBody: {
      seats?: Array<Seat>;
    },
  }): CancelablePromise<{
    bookingId?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/movieSessions/{movieSessionId}/bookings',
      path: {
        'movieSessionId': movieSessionId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Неверное тело запроса`,
        401: `Неавторизованный доступ`,
        403: `Доступ запрещен`,
        404: `Киносеанс не найден`,
        409: `Места уже забронированы`,
      },
    });
  }
}
