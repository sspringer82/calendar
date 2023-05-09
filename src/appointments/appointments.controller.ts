import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

class NumberParameter {
  @IsNumberString()
  id: string;
}

type RequestType = {
  user: {
    username: string;
    sub: number;
  };
};

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({
    status: 201,
    description: 'The newly generated appointment',
    type: Appointment,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post()
  async create(
    @Body() newAppointment: CreateAppointment,
    @Request() request: RequestType,
  ): Promise<Appointment> {
    const newAppointmentClone = structuredClone(newAppointment);
    newAppointmentClone.owner = { id: request.user.sub } as unknown as User;

    return this.appointmentService.create(newAppointmentClone);
  }

  @ApiOperation({ summary: 'Fetch one appointment' })
  @ApiResponse({
    status: 200,
    description: 'The requested appointment',
    type: Appointment,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the appointment',
    required: true,
    type: String,
    example: 1,
  })
  @Get(':id')
  getOne(
    @Param() { id }: NumberParameter,
    @Request() request: RequestType,
  ): Promise<Appointment> {
    const parsedId = parseInt(id, 10);
    return this.appointmentService.getOne(parsedId, request.user.sub);
  }

  @ApiOperation({ summary: 'Fetch all appointments' })
  @ApiResponse({
    status: 200,
    description: 'All available appointments for the user',
    type: Appointment,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get()
  async getAll(@Request() request: RequestType): Promise<Appointment[]> {
    return this.appointmentService.getAll(request.user.sub);
  }

  @ApiOperation({ summary: 'Update an existing appointment' })
  @ApiResponse({
    status: 200,
    description: 'The updated appointment',
    type: Appointment,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the appointment',
    required: true,
    type: String,
    example: 1,
  })
  @Put(':id')
  update(
    @Param('id')
    id: string,
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

  @ApiOperation({ summary: 'Remove an existing appointment' })
  @ApiResponse({
    status: 204,
    description: 'Deletion was successful, no content',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the appointment',
    required: true,
    type: String,
    example: 1,
  })
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appointmentService.remove(id);
  }
}
