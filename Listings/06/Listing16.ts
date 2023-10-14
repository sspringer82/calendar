import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment, NewAppointment } from './Appointments.model';
import { CreateAppointment } from './Appointment';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('newAppointment', { type: () => NewAppointment })
    newAppointment: CreateAppointment,
  ): Promise<Appointment> {
    const appointment = {
      ...newAppointment,
      owner: { id: 1 },
    } as CreateAppointment;
    const createdAppointment = await this.appointmentsService.create(
      appointment,
    );
    console.log(createdAppointment);
    pubSub.publish('newAppointment', { newAppointment: createdAppointment });
    return createdAppointment;
  }

  @Subscription(() => Appointment)
  newAppointment() {
    return pubSub.asyncIterator('newAppointment');
  }
}
