import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, CreateAppointment } from './Appointment';
import { AppointmentsGateway } from './appointments.gateway';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
    private readonly appointmentsGateway: AppointmentsGateway,
  ) { }

  async create(newAppointment: CreateAppointment): Promise<Appointment> {
    const savedAppointment = await this.appointmentsRepository.save(
      newAppointment,
    );
    this.appointmentsGateway.broadcastNewData(savedAppointment);
    return savedAppointment;
  }
}
