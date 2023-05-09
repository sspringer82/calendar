import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/User';
import { ApiProperty, OmitType } from '@nestjs/swagger';

@Entity('appointments')
export class Appointment {
  @ApiProperty({
    example: 1,
    description: 'The generated ID of an appointment',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Breakfast',
    description: 'The title of an appointment',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 1682928000,
    description: 'The timestamp of the begin of the appointment',
  })
  @Column()
  start: number;

  @ApiProperty({
    example: 1682935200,
    description: 'The timestamp of the end of the appointment',
  })
  @Column()
  end: number;

  @ApiProperty({
    description: 'Users invited to the appointment',
    type: User,
    isArray: true,
  })
  @ManyToMany(() => User)
  @JoinTable()
  invitees: User[];

  @ApiProperty({ description: 'The owner of the appointment' })
  @ManyToOne(() => User)
  owner: User;
}

export class CreateAppointment extends OmitType(Appointment, ['id'] as const) {}
