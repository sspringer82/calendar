import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

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

  @ManyToMany(() => User)
  @JoinTable()
  invitees: User[];
}

export type CreateAppointment = Omit<Appointment, 'id'>;
