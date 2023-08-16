import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Appointment } from './Appointment';

@WebSocketGateway()
export class AppointmentsGateway {
  @WebSocketServer()
  server: Server;

  broadcastNewData(newAppointment: Appointment) {
    this.server.emit('newData', newAppointment);
  }
}
