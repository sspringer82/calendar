import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Appointment, CreateAppointment } from './Appointment';
import {
  Appointment,
  AppointmentDocument,
  CreateAppointment,
} from './schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(newAppointment: CreateAppointment): Promise<Appointment> {
    const createdAppointment = new this.appointmentModel(newAppointment);
    return createdAppointment.save();
  }

  async getAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }
}
