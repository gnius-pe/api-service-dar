import { getPatientByIdService } from '../../../src/service/patient.service.js';
import TestPatient from '../../../src/models/patient.model.js';
import { jest } from '@jest/globals';

describe('getPatientByIdService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a patient if found by ID', async () => {
        const mockPatient = {
            _id: 'patient1',
            personalInformation: {
                name: 'John Doe',
                birthDate: '1990-01-01',
            },
            location: {
                department: 'Department',
                province: 'Province',
                district: 'District',
                reference: 'Reference',
            },
            cita: {
                appointmentDate: '2024-01-01',
            },
            question: {
                questionExamRecent: true,
                spiritualSupport: false,
                futureActivities: true,
            },
            estate: 'Active',
        };

        // Mock the findById method
        TestPatient.findById = jest.fn().mockResolvedValue(mockPatient);

        const result = await getPatientByIdService('patient1');

        expect(TestPatient.findById).toHaveBeenCalledWith('patient1');
        expect(result).toEqual(mockPatient);
    });

    it('should throw an error if patient is not found', async () => {
        // Mock the findById method to return null
        TestPatient.findById = jest.fn().mockResolvedValue(null);

        await expect(getPatientByIdService('nonexistentId')).rejects.toThrow('Paciente no encontrado');
    });

    it('should handle errors thrown by findById', async () => {
        // Mock the findById method to throw an error
        TestPatient.findById = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(getPatientByIdService('patient1')).rejects.toThrow('Database error');
    });
});
