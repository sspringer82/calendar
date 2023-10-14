
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Appointment {
    id: string;
    title: string;
    start: number;
    end: number;
}

export interface IQuery {
    appointments(): Nullable<Nullable<Appointment>[]> | Promise<Nullable<Nullable<Appointment>[]>>;
}

type Nullable<T> = T | null;
