/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MovieSessionWithSeats } from './MovieSessionWithSeats';
import type { Seat } from './Seat';
/**
 * Детали сеанса фильма
 */
export type MovieSessionDetails = (MovieSessionWithSeats & {
  bookedSeats?: Array<Seat>;
});

