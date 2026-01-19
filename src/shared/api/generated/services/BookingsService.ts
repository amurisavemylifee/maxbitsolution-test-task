/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookingsService {
  /**
   * Оплатить бронирование
   * Отмечает бронирование как оплаченное.
   * @returns any Бронирование успешно оплачено
   * @throws ApiError
   */
  public static postBookingsPayments({
    bookingId,
  }: {
    bookingId: string,
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/bookings/{bookingId}/payments',
      path: {
        'bookingId': bookingId,
      },
      errors: {
        404: `Бронирование не найдено.`,
        409: `Бронирование уже оплачено.`,
        500: `Внутренняя ошибка сервера.`,
      },
    });
  }
}
