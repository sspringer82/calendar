import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array two elements', async () => {
      const results = await service.getAll();

      expect(results).toHaveLength(2);
      expect(results[0].title).toBe('Dentist Appointment');
    });
  });
});
