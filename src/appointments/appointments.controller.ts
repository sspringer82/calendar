import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Appointment, CreateAppointment } from './Appointment';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/User';
import { Role, Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

type RequestType = {
  user: {
    username: string;
    sub: number;
  };
};

@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) { }

  @Post()
  async create(
    @Body() newAppointment: CreateAppointment,
    @Request() request: RequestType,
  ): Promise<Appointment> {
    const newAppointmentClone = structuredClone(newAppointment);
    newAppointmentClone.owner = { id: request.user.sub } as unknown as User;

    return this.appointmentService.create(newAppointmentClone);
  }

  @Get(':id')
  getOne(
    @Param('id') id: string,
    @Request() request: RequestType,
  ): Promise<Appointment> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.getOne(parsedId, request.user.sub);
  }

  @Get()
  async getAll(@Request() request: RequestType): Promise<Appointment[]> {
    return this.appointmentService.getAll(request.user.sub);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() appointment: Appointment,
    @Request() request: RequestType,
  ): Promise<Appointment> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.update(
      parsedId,
      appointment,
      request.user.sub,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @HttpCode(204)
  remove(
    @Param('id') id: string,
  ): Promise<void> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.remove(parsedId);
  }
}
