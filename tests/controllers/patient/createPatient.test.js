import request from 'supertest';
import app from '../../../src/app.js';
import TestPatient from '../../../src/models/patient.model.js';
import Specialty from '../../../src/models/specialty.model.js';
import httpResponses from '../../../src/utils/httpResponses.js';
import { setupTestDB } from '../../config/testSetup.js';
import { jest } from '@jest/globals';


setupTestDB();

describe('Patient Controller - createPatient', () => {

  it('should create a new patient successfully', async () => {
    const mockPatientData = {
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
            { label: 'Cardiology', value: 'cardiology' }, // Asegúrate de incluir el campo `value`
          ],
          appointmentDetail: 'Detail of appointment',
        },
        question: {
          questionExamRecent: true,
          spiritualSupport: false,
          futureActivities: true,
        },
        estate: 'Pending',
      };
  

    const mockSpecialty = {
        specialtyName: 'Cardiology',
        availableSlots: 10,
        save: jest.fn().mockResolvedValue(),
    };

    jest.spyOn(Specialty, 'findOne').mockResolvedValue(mockSpecialty);
    
    const res = await request(app).post('/api/patient').send(mockPatientData);
    expect(res.statusCode).toBe(httpResponses.CREATED.status); // Verifica que el estado sea 201 CREATED
    expect(res.body).toHaveProperty('_id'); // Verifica que la respuesta contenga un ID de paciente
    expect(res.body.personalInformation.name).toBe(mockPatientData.personalInformation.name); // Verifica que el nombre sea el mismo
    expect(res.body.cita.specialties[0].label).toBe(mockPatientData.cita.specialties[0].label); // Verifica la especialidad
    expect(res.body.cita.specialties[0].value).toBe(mockPatientData.cita.specialties[0].value); // Verifica el valor de la especialidad
  });


});
