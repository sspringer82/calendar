import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CreateUser, User } from '../users/Users.model';

@ObjectType({ description: 'Appointment' })
export class Appointment {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  start: number;

  @Field(() => Int)
  end: number;

  @Field(() => [User])
  invitees: User[];
}

@InputType()
export class NewAppointment {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  start: number;

  @Field(() => Int)
  end: number;

  @Field(() => [CreateUser], { nullable: true })
  invitees: CreateUser[];
}
