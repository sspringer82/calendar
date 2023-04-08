import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  roles: string;
}

export type CreateUser = Omit<User, 'id'> & { repeatPassword: string };
