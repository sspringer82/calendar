it('should create a new appointment', async () => {
  const newAppointment: CreateAppointment = {
    title: 'Test Appointment',
    start: 1682928000,
    end: 1682935200,
    invitees: [],
    owner: null,
  };

  const savedAppointment: Appointment = new Appointment();
  savedAppointment.id = 1;

  jest.spyOn(repository, 'save').mockResolvedValue(savedAppointment);
  jest.spyOn(gateway, 'broadcastNewData');

  const result = await service.create(newAppointment);

  expect(result).toEqual(savedAppointment);
  expect(repository.save).toHaveBeenCalledWith(newAppointment);
  expect(gateway.broadcastNewData).toHaveBeenCalledWith(savedAppointment);
});
