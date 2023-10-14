import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

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

@InputType({ description: 'User' })
export class CreateUser {
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
