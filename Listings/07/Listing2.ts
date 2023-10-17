import { Injectable } from '@nestjs/common';
import { Appointment } from './Appointment';

@Injectable()
export class AppointmentsService {
  async getAll(): Promise<Appointment[]> {
    const appointments: Appointment[] = [
      {
        id: 1,
        title: 'Dentist Appointment',
        start: 1678886400000,
        end: 1678890000000,
      },
      {
        id: 2,
        title: 'Team Meeting',
        start: 1678922400000,
        end: 1678926000000,
      },
    ];
    return appointments;
  }
}
