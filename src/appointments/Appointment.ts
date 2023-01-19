export class Appointment {
  id: number;
  title: string;
  start: number;
  end: number;
}

export type CreateAppointment = Omit<Appointment, 'id'>;
