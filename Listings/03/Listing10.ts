import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './Appointment';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) { }

  async getAll(userId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: { invitees: true },
      where: { owner: { id: userId } },
    });
  }
}
