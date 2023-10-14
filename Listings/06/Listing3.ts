import { Query, Resolver } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './Appointments.model';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment])
  getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentsService.getAll(1);
  }
}
