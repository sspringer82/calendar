import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentsService } from './appointments.service';
import { Appointment, CreateAppointment } from './Appointment';
import { AppointmentsGateway } from './appointments.gateway';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let repository: Repository<Appointment>;
  let gateway: AppointmentsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useClass: Repository,
        },
        {
          provide: AppointmentsGateway,
          useClass: class {
            broadcastNewData() {}
          },
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    repository = module.get<Repository<Appointment>>(
      getRepositoryToken(Appointment),
    );
    gateway = module.get<AppointmentsGateway>(AppointmentsGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
