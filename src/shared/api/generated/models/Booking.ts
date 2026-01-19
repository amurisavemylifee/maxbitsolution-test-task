/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Seat } from './Seat';
/**
 * Бронирование пользователя
 */
export type Booking = {
  /**
   * Идентификатор бронирования
   */
  id?: string;
  /**
   * Идентификатор пользователя
   */
  userId?: number;
  /**
   * Идентификатор киносеанса
   */
  movieSessionId?: number;
  /**
   * Идентификатор сеанса
   */
  sessionId?: number;
  /**
   * Дата бронирования
   */
  bookedAt?: string;
  /**
   * Забронированные места
   */
  seats?: Array<Seat>;
  /**
   * Статус оплаты
   */
  isPaid?: boolean;
};

