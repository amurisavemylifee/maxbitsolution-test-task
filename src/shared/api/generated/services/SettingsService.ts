/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Settings } from '../models/Settings';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SettingsService {
  /**
   * Получить настройки приложения
   * Возвращает текущие настройки приложения, включая время, в течение которого бронирование должно быть оплачено.
   * @returns Settings Настройки приложения
   * @throws ApiError
   */
  public static getSettings(): CancelablePromise<Settings> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/settings',
    });
  }
}
