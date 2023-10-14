import { Context, Query, Resolver } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './Appointments.model';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/graphqlauth.guard';

@UseGuards(GraphQLAuthGuard)
@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment])
  getAllAppointments(
    @Context() context: { req: Request; res: Response },
  ): Promise<Appointment[]> {
    const userid = (context.req as any).user.id;
    return this.appointmentsService.getAll(userid);
  }
}
