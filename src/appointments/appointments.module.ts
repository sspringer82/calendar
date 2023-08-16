import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './Appointment';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AppointmentsGateway } from './appointments.gateway';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), JwtModule, UsersModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentsGateway, WsAuthGuard],
})
export class AppointmentsModule { }
