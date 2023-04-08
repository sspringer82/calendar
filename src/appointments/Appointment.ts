import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/User';

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

  @ManyToOne(() => User)
  owner: User;
}

export type CreateAppointment = Omit<Appointment, 'id'>;
