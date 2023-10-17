import {
  Args,
  Context,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment, NewAppointment } from './Appointments.model';
import { NotFoundException, ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  CreateAppointment,
  Appointment as AppointmentEntity,
} from './Appointment';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLAuthGuard } from '../auth/graphqlauth.guard';

const pubSub = new PubSub();

@UseGuards(GraphQLAuthGuard)
@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment])
  getAllAppointments(
    @Context() context: { req: Request; res: Response },
  ): Promise<Appointment[]> {
    return this.appointmentsService.getAll((context.req as any).user.id);
  }

  @Query(() => Appointment)
  async getOneAppointment(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsService.getOne(id, 1);
    if (!appointment) {
      throw new NotFoundException(id);
    }
    return appointment;
  }

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

  // update
  @Mutation(() => Appointment)
  async updateAppointment(
    @Args('updatedAppointment', { type: () => NewAppointment })
    updatedAppointment: AppointmentEntity,
  ): Promise<Appointment> {
    return this.appointmentsService.update(
      updatedAppointment.id,
      updatedAppointment,
      1,
    );
  }

  // delete
  @Mutation(() => Appointment)
  async removeAppointment(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<Appointment> {
    const appointment = await this.appointmentsService.getOne(id, 1);
    await this.appointmentsService.remove(id);
    return appointment;
  }

  @Subscription(() => Appointment)
  newAppointment() {
    return pubSub.asyncIterator('newAppointment');
  }
}
