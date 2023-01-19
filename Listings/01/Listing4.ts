import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Appointment, CreateAppointment } from './Appointment';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Post()
  create(@Body() newAppointment: CreateAppointment): Promise<Appointment> {
    return this.appointmentService.create(newAppointment);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Appointment> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.getOne(parsedId);
  }

  @Get()
  getAll(): Promise<Appointment[]> {
    return this.appointmentService.getAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() appointment: Appointment,
  ): Promise<Appointment> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.update(parsedId, appointment);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.remove(parsedId);
  }
}
