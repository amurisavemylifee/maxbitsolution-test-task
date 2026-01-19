/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MovieSession } from './MovieSession';
/**
 * Киносеанс с информацией о размерах зала
 */
export type MovieSessionWithSeats = (MovieSession & {
  seats?: {
    /**
     * Количество рядов
     */
    rows?: number;
    /**
     * Количество мест в ряду
     */
    seatsPerRow?: number;
  };
});

