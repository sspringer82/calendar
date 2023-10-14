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
