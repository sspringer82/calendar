import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Appointment, CreateAppointment } from './Appointment';
import { AppointmentsService } from './appointments.service';
import { Inject, forwardRef } from '@nestjs/common';
import { User } from 'src/users/User';

@WebSocketGateway()
export class AppointmentsGateway {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(forwardRef(() => AppointmentsService))
    private appointmentsService: AppointmentsService,
  ) {}

  broadcastNewData(newAppointment: Appointment) {
    this.server.emit('newData', newAppointment);
  }

  @SubscribeMessage('createAppointment')
  async handleCreate(@MessageBody() newAppointment: CreateAppointment) {
    newAppointment.owner = { id: 5 } as User;
    return this.appointmentsService.create(newAppointment);
  }
}