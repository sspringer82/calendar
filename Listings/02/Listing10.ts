import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
