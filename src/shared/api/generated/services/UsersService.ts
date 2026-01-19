/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
  /**
   * Получить список бронирований пользователя
   * Возвращает список всех бронирований, сделанных текущим аутентифицированным пользователем.
   * @returns Booking Список бронирований пользователя
   * @throws ApiError
   */
  public static getMeBookings(): CancelablePromise<Array<Booking>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/me/bookings',
      errors: {
        401: `Неавторизованный доступ. Отсутствует или недействителен токен аутентификации.`,
        500: `Внутренняя ошибка сервера.`,
      },
    });
  }
}
