it('should create a new appointment', async () => {
  const newAppointment: CreateAppointment = {
    title: 'Test Appointment',
    start: 1682928000,
    end: 1682935200,
    invitees: [],
    owner: null,
  };

  const createdAppointment: Appointment = {
    id: 1,
    title: 'Test Appointment',
    start: 1682928000,
    end: 1682935200,
    invitees: [],
    owner: null,
  };

  const request = {
    user: {
      username: 'testuser',
      sub: 1,
    },
  };

  jest.spyOn(service, 'create').mockResolvedValue(createdAppointment);

  const result = await controller.create(newAppointment, request);

  expect(result).toEqual(createdAppointment);
});
