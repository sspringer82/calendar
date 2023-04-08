import {
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Appointment } from './Appointment';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @Get()
  async getAll(@Request() request: RequestType): Promise<Appointment[]> {
    return this.appointmentService.getAll(request.user.sub);
  }
}
