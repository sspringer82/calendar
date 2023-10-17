it('should get an appointment by id', async () => {
  const id = 1;
  const userId = 2;

  const appointment = new Appointment();
  appointment.id = id;
  appointment.owner = { id: userId } as any;

  jest.spyOn(repository, 'findOneOrFail').mockResolvedValue(appointment);

  const result = await service.getOne(id, userId);

  expect(result).toEqual(appointment);
  expect(repository.findOneOrFail).toHaveBeenCalledWith({
    where: { id, owner: { id: userId } },
    relations: { invitees: true },
  });
});
