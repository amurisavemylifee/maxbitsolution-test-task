/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
  /**
   * Вход пользователя
   * Аутентификация пользователя и получение JWT токена.
   * @returns any JWT токен
   * @throws ApiError
   */
  public static postLogin({
    requestBody,
  }: {
    requestBody: {
      username: string;
      password: string;
    },
  }): CancelablePromise<{
    token?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/login',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Требуется имя пользователя и пароль`,
        401: `Неверное имя пользователя или пароль`,
      },
    });
  }
  /**
   * Регистрация нового пользователя
   * Регистрация нового пользователя в системе.
   * @returns any Пользователь успешно зарегистрирован
   * @throws ApiError
   */
  public static postRegister({
    requestBody,
  }: {
    requestBody: {
      username: string;
      password: string;
    },
  }): CancelablePromise<{
    token?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/register',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Требуется имя пользователя и пароль`,
        409: `Имя пользователя уже существует`,
        500: `Ошибка регистрации`,
      },
    });
  }
}
