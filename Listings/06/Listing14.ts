@Mutation(() => Appointment)
async createAppointment(
  @Args('newAppointment', { type: () => NewAppointment })
  newAppointment: CreateAppointment,
): Promise<Appointment> {
  const appointment = {
    ...newAppointment,
    owner: { id: 1 },
  } as CreateAppointment;
  return this.appointmentsService.create(appointment);
}