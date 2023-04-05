import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, CreateAppointment } from './Appointment';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}

  async create(newAppointment: CreateAppointment): Promise<Appointment> {
    return this.appointmentsRepository.save(newAppointment);
  }

  async getOne(id: number): Promise<Appointment> {
    try {
      return await this.appointmentsRepository.findOneByOrFail({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async getAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find();
  }

  async update(id: number, appointment: Appointment): Promise<Appointment> {
    await this.getOne(id);
    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentsRepository.delete(id);
  }
}
