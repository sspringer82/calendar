import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Stelle sicher, dass der richtige Pfad zu deiner App angegeben ist
import {
  Appointment,
  CreateAppointment,
} from '../src/appointments/Appointment';
import * as jwt from 'jsonwebtoken';

function createJWT(userId: number, username: string): string {
  const payload = { sub: userId, username };
  const secretKey = 'TOP SECRET VALUE FOR MY TOKENS';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secretKey, options);
}

describe('AppointmentsController - E2E', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a new appointment', async () => {
    const newAppointment: CreateAppointment = {
      title: 'Test Appointment',
      start: 1682928000,
      end: 1682935200,
      invitees: [],
      owner: null,
    };

    const createdAppointment: Appointment = {
      id: 13,
      title: 'Test Appointment',
      start: 1682928000,
      end: 1682935200,
      invitees: [],
      owner: { id: 1 } as any,
    };
    const token = createJWT(1, 'admin');

    const response = await request(app.getHttpServer())
      .post('/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send(newAppointment)
      .expect(201);

    expect(response.body).toEqual(createdAppointment);
  });
});
