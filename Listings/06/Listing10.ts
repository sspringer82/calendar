import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/Users.model';

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
