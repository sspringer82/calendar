import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  start: number;

  @Column()
  end: number;
}

export type CreateAppointment = Omit<Appointment, 'id'>;
