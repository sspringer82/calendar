import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Appointment, CreateAppointment } from './Appointment';
import { AppointmentsService } from './appointments.service';
import {
  Inject,
  UseGuards,
  UsePipes,
  ValidationPipe,
  forwardRef,
} from '@nestjs/common';
import { User } from 'src/users/User';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';

@UseGuards(WsAuthGuard)
@WebSocketGateway()
@UsePipes(new ValidationPipe())
export class AppointmentsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => AppointmentsService))
    private appointmentsService: AppointmentsService,
    private readonly wsAuthGuard: WsAuthGuard,
  ) {}

  handleConnection(client: any, ...args: any[]) {
    try {
      if (
        !this.wsAuthGuard.canActivate({
          switchToWs: () => ({ getClient: () => client }),
        } as any)
      ) {
        client.disconnect();
      }
    } catch {
      client.disconnect();
    }
  }

  broadcastNewData(newAppointment: Appointment) {
    this.server.emit('newData', newAppointment);
  }

  @SubscribeMessage('createAppointment')
  async handleCreate(
    @MessageBody() newAppointment: CreateAppointment,
    @ConnectedSocket() client: any,
  ) {
    newAppointment.owner = { id: client.user.sub } as User;
    return this.appointmentsService.create(newAppointment);
  }
}
