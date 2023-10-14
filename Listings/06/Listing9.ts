import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  username: string;

  @Field()
  roles: string;
}
