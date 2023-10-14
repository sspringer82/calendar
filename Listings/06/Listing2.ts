import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

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
}
