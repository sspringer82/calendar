import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'The generated ID of the user',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Jane',
    description: 'The first name of the user',
  })
  @Column()
  firstname: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @Column()
  lastname: string;

  @ApiProperty({
    example: 'JDoe',
    description: 'The user name of the user',
  })
  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: 'Admin',
    description: 'The roles of the user',
  })
  @Column()
  roles: string;
}

export type CreateUser = Omit<User, 'id'> & { repeatPassword: string };
