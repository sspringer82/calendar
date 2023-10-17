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

  describe('create', () => {
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
  });

  describe('getOne', () => {
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

    it('should throw NotFoundException if appointment not found', async () => {
      const id = 1;
      const userId = 2;

      jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(new Error());

      await expect(service.getOne(id, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAll', () => {
    it('should get all appointments for a user', async () => {
      const userId = 1;

      const appointments: Appointment[] = [
        // Create sample appointments here
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(appointments);

      const result = await service.getAll(userId);

      expect(result).toEqual(appointments);
      expect(repository.find).toHaveBeenCalledWith({
        relations: { invitees: true },
        where: { owner: { id: userId } },
      });
    });
  });

  describe('update', () => {
    it('should update an appointment', async () => {
      const id = 1;
      const userId = 2;

      const existingAppointment = new Appointment();
      existingAppointment.id = id;
      existingAppointment.owner = { id: userId } as any;

      const updatedAppointment: Appointment = {
        id: 1,
        title: 'Updated Appointment',
        start: 1682928000,
        end: 1682935200,
        invitees: [],
        owner: existingAppointment.owner,
      };

      jest
        .spyOn(repository, 'findOneOrFail')
        .mockResolvedValue(existingAppointment);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedAppointment);

      const result = await service.update(id, updatedAppointment, userId);

      expect(result).toEqual(updatedAppointment);
      expect(repository.findOneOrFail).toHaveBeenCalledWith({
        where: { id, owner: { id: userId } },
        relations: { invitees: true },
      });
      expect(repository.save).toHaveBeenCalledWith(updatedAppointment);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      const id = 1;
      const userId = 2;

      jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(new Error());

      await expect(
        service.update(id, {} as Appointment, userId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an appointment', async () => {
      const id = 1;

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });

      await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith({ id });
    });

    it('should throw NotFoundException if appointment not found', async () => {
      const id = 1;

      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0, raw: [] });

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
