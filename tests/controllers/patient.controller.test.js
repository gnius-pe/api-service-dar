import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../../src/app.js';
import TestPatient from '../../src/models/patient.model.js';
import httpResponses from '../../src/utils/httpResponses.js';

let mongoServer;

afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await TestPatient.deleteMany({}); // Asegúrate de que MongoDB esté conectado antes de realizar operaciones
    }
  });

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  if (mongoose.connection.readyState === 1) {
    await TestPatient.deleteMany({}); // Limpia la base de datos entre pruebas
  }
});

describe('Patient Controller - getDNIDuplicate', () => {

  it('should return true if DNI is a duplicate', async () => {
    // Inserta un paciente con todos los campos requeridos
    await TestPatient.create({
      personalInformation: {
        name: 'John',
        lastName: 'Doe',
        numberIdentification: '12345678',
        email: 'john.doe@example.com',
        firtsNumberPhone: '123456789',
        secondNumberPhone: '987654321',
        sexo: 'M',
        birthDate: '1990-01-01',
      },
      location: {
        department: 'Department',
        province: 'Province',
        district: 'District',
        reference: 'Reference',
      },
      cita: {
        appointmentDate: new Date(),
        specialties: [
          { label: 'Specialty 1', value: 'specialty1' },
        ],
        appointmentDetail: 'Detail of appointment',
      },
      question: {
        questionExamRecent: true,
        spiritualSupport: false,
        futureActivities: true,
      },
      estate: 'Pending',
      numberFile: 12345,
    });

    const res = await request(app).get('/api/dni/12345678');

    expect(res.statusCode).toBe(httpResponses.OK.status);
    expect(res.body.state).toBe(true);
  });

  it('should return false if DNI is not a duplicate', async () => {
    const res = await request(app).get('/api/dni/87654321');

    expect(res.statusCode).toBe(httpResponses.NOT_FOUND.status);
    expect(res.body.state).toBe(false);
  });

});
