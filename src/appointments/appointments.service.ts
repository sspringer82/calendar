import { Injectable, NotFoundException } from '@nestjs/common';
import { Appointment, CreateAppointment } from './Appointment';

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[];

  async create(newAppointment: CreateAppointment): Promise<Appointment> {
    const id =
      this.appointments.length > 0
        ? Math.max(...this.appointments.map((appointment) => appointment.id)) +
          1
        : 1;
    const createdAppointment: Appointment = { ...newAppointment, id };
    this.appointments.push(createdAppointment);
    return createdAppointment;
  }

  async getOne(id: number): Promise<Appointment> {
    const appointment = this.appointments.find((app) => app.id === id);
    if (appointment) {
      return appointment;
    }
    throw new NotFoundException();
  }

  async getAll(): Promise<Appointment[]> {
    return this.appointments;
  }

  async update(id: number, appointment: Appointment): Promise<Appointment> {
    const index = this.findIndexOfAppointment(id);
    this.appointments[index] = appointment;
    return appointment;
  }

  async remove(id: number): Promise<void> {
    const index = this.findIndexOfAppointment(id);
    this.appointments.splice(index, 1);
  }

  private findIndexOfAppointment(id: number): number {
    return this.appointments.findIndex((app) => app.id === id);
  }
}
