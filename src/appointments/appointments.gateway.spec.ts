import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsGateway } from './appointments.gateway';

describe('AppointmentsGateway', () => {
  let gateway: AppointmentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsGateway],
    }).compile();

    gateway = module.get<AppointmentsGateway>(AppointmentsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
