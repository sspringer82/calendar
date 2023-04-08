import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, CreateAppointment } from './Appointment';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) { }

  async create(newAppointment: CreateAppointment): Promise<Appointment> {
    return this.appointmentsRepository.save(newAppointment);
  }

  async getOne(id: number, userId: number): Promise<Appointment> {
    try {
      return await this.appointmentsRepository.findOneOrFail({
        where: { id, owner: { id: userId } },
        relations: { invitees: true },
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async getAll(userId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: { invitees: true },
      where: { owner: { id: userId } },
    });
  }

  async update(
    id: number,
    appointment: Appointment,
    userId: number,
  ): Promise<Appointment> {
    await this.getOne(id, userId);
    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.appointmentsRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
