import { updatePatientService } from '../../../src/service/patient.service.js';
import TestPatient from '../../../src/models/patient.model.js';
import { jest } from '@jest/globals';

describe('updatePatientService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a patient successfully', async () => {
        const patientId = 'somePatientId';
        const patientData = {
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
                    { label: 'Cardiology' },
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

        // Mock findByIdAndUpdate
        const mockPatient = {
            toObject: jest.fn().mockReturnValue({
                personalInformation: patientData.personalInformation,
                location: patientData.location,
                cita: patientData.cita,
                question: patientData.question,
                estate: patientData.estate,
            }),
        };
        TestPatient.findByIdAndUpdate = jest.fn().mockResolvedValue(mockPatient);

        const result = await updatePatientService(patientId, patientData);

        expect(TestPatient.findByIdAndUpdate).toHaveBeenCalledWith(
            patientId,
            {
                personalInformation: patientData.personalInformation,
                location: patientData.location,
                cita: patientData.cita,
                question: patientData.question,
                estate: patientData.estate,
            },
            { new: true }
        );
        expect(result.personalInformation.name).toBe('John');
        expect(result.cita.specialties[0].label).toBe('Cardiology');
    });

    it('should throw an error if the patient does not exist', async () => {
        const patientId = 'nonExistentPatientId';
        const patientData = {
            personalInformation: {
                name: 'Jane',
                lastName: 'Doe',
                numberIdentification: '87654321',
                email: 'jane.doe@example.com',
                firtsNumberPhone: '987654321',
                sexo: 'F',
                birthDate: '1992-02-02',
            },
            location: {
                department: 'Department',
                province: 'Province',
                district: 'District',
                reference: 'Reference',
            },
            cita: {
                appointmentDate: new Date(),
                specialties: [],
                appointmentDetail: 'Detail of appointment',
            },
            question: {
                questionExamRecent: false,
                spiritualSupport: true,
                futureActivities: false,
            },
            estate: 'Pending',
        };

        // Mock findByIdAndUpdate to return null
        TestPatient.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

        await expect(updatePatientService(patientId, patientData)).rejects.toThrow('Patient not found');
    });

    it('should update a patient even if optional fields are missing', async () => {
        const patientId = 'somePatientId';
        const patientData = {
            personalInformation: {
                name: 'Jane',
                lastName: 'Doe',
                numberIdentification: '87654321',
                email: 'jane.doe@example.com',
                firtsNumberPhone: '987654321',
                sexo: 'F',
                birthDate: '1992-02-02',
            },
            location: {
                department: 'Department',
                province: 'Province',
                district: 'District',
                reference: 'Reference',
            },
            cita: {
                appointmentDate: new Date(),
                specialties: [],
                appointmentDetail: 'Detail of appointment',
            },
            question: {
                questionExamRecent: false,
                spiritualSupport: true,
                futureActivities: false,
            },
            estate: 'Pending',
        };

        // Mock findByIdAndUpdate
        const mockPatient = {
            toObject: jest.fn().mockReturnValue({
                personalInformation: patientData.personalInformation,
                location: patientData.location,
                cita: patientData.cita,
                question: patientData.question,
                estate: patientData.estate,
            }),
        };
        TestPatient.findByIdAndUpdate = jest.fn().mockResolvedValue(mockPatient);

        const result = await updatePatientService(patientId, patientData);

        expect(result.personalInformation.name).toBe('Jane');
        expect(result.cita.appointmentDetail).toBe('Detail of appointment');
        expect(result.cita.specialties).toEqual([]);
    });

    it('should throw an error if something goes wrong during the update', async () => {
        const patientId = 'somePatientId';
        const patientData = {
            personalInformation: {
                name: 'John',
                lastName: 'Doe',
                numberIdentification: '12345678',
                email: 'john.doe@example.com',
                firtsNumberPhone: '123456789',
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
                    { label: 'Cardiology' },
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

        // Mock findByIdAndUpdate to throw an error
        TestPatient.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(updatePatientService(patientId, patientData)).rejects.toThrow('Error updating patient: Database error');
    });
});
