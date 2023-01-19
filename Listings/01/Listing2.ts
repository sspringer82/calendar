import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Appointment, CreateAppointment } from './Appointment';

@Controller('appointments')
export class AppointmentsController {
  private appointments: Appointment[] = [];

  @Post()
  create(@Body() newAppointment: CreateAppointment): Appointment {
    const id =
      this.appointments.length > 0
        ? Math.max(...this.appointments.map((appointment) => appointment.id)) +
          1
        : 1;
    const createdAppointment: Appointment = { ...newAppointment, id };
    this.appointments.push(createdAppointment);
    return createdAppointment;
  }

  @Get(':id')
  getOne(@Param('id') id: string): Appointment {
    const appointment = this.appointments.find(
      (app) => app.id === parseInt(id, 10),
    );
    if (appointment) {
      return appointment;
    }
    throw new NotFoundException();
  }

  @Get()
  getAll(): Appointment[] {
    return this.appointments;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() appointment: Appointment,
  ): Appointment {
    const index = this.findIndexOfAppointment(id);
    this.appointments[index] = appointment;
    return appointment;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const index = this.findIndexOfAppointment(id);
    this.appointments.splice(index, 1);
  }

  private findIndexOfAppointment(id: string): number {
    return this.appointments.findIndex((app) => app.id === parseInt(id, 10));
  }
}
