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