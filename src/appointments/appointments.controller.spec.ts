import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment, CreateAppointment } from './Appointment';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        ConfigService,
        JwtService,
        {
          provide: AppointmentsService,
          useClass: class {
            create() {}
            getAll() {}
            getOne() {}
          },
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  describe('create', () => {
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
  });

  describe('getOne', () => {
    it('should get one appointment', async () => {
      const id = '1';

      const requestedAppointment: Appointment = {
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

      jest.spyOn(service, 'getOne').mockResolvedValue(requestedAppointment);

      const result = await controller.getOne({ id }, request);

      expect(result).toEqual(requestedAppointment);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      const id = '1';

      const request = {
        user: {
          username: 'testuser',
          sub: 1,
        },
      };

      jest.spyOn(service, 'getOne').mockRejectedValue(new NotFoundException());

      await expect(controller.getOne({ id }, request)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAll', () => {
    it('should get all appointments', async () => {
      const appointments: Appointment[] = [
        {
          id: 1,
          title: 'Test Appointment',
          start: 1682928000,
          end: 1682935200,
          invitees: [],
          owner: null,
        },
      ];

      const request = {
        user: {
          username: 'testuser',
          sub: 1,
        },
      };

      jest.spyOn(service, 'getAll').mockResolvedValue(appointments);

      const result = await controller.getAll(request);

      expect(result).toEqual(appointments);
    });
  });

  // Add tests for the 'update' and 'remove' methods here
});
