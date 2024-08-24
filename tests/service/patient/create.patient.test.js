import { createPatientService } from '../../../src/service/patient.service.js';
import TestPatient from '../../../src/models/patient.model.js';
import SpecialtyModel from '../../../src/models/specialty.model.js';
import { jest } from '@jest/globals';

jest.mock('../../../src/models/patient.model.js');
jest.mock('../../../src/models/specialty.model.js');

describe('createPatientService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new patient and update specialties', async () => {
        // Datos de entrada simulados
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

        // Mock para countDocuments y save en el modelo TestPatient
        TestPatient.countDocuments.mockResolvedValue(5);
        const mockSavedPatient = {
            toObject: () => ({
                _id: 'mockedPatientId',
                personalInformation: patientData.personalInformation,
                location: patientData.location,
                cita: patientData.cita,
                question: patientData.question,
                estate: patientData.estate,
                numberFile: 6,
            }),
            save: jest.fn().mockResolvedValue({
                toObject: jest.fn().mockReturnValue({
                    _id: 'mockedPatientId',
                    personalInformation: patientData.personalInformation,
                    location: patientData.location,
                    cita: patientData.cita,
                    question: patientData.question,
                    estate: patientData.estate,
                    numberFile: 6,
                }),
            }),
        };
        TestPatient.mockImplementation(() => mockSavedPatient);

        // Mock para SpecialtyModel
        const mockSpecialty = {
            availableSlots: 10,
            save: jest.fn().mockResolvedValue(),
        };
        SpecialtyModel.findOne.mockResolvedValue(mockSpecialty);

        // Llamada al servicio
        const result = await createPatientService(patientData);

        // Verificaciones
        expect(result).toHaveProperty('_id', 'mockedPatientId');
        expect(result.personalInformation.name).toBe(patientData.personalInformation.name);
        expect(result.cita.specialties[0].label).toBe('Cardiology');

        // Verifica que SpecialtyModel.findOne se llamó con los valores correctos
        expect(SpecialtyModel.findOne).toHaveBeenCalledWith({ specialtyName: 'Cardiology' });
        expect(mockSpecialty.save).toHaveBeenCalled();
        expect(mockSpecialty.availableSlots).toBe(9);

        // Verifica que el paciente se haya guardado correctamente
        expect(mockSavedPatient.save).toHaveBeenCalled();
        expect(mockSavedPatient.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if something goes wrong', async () => {
        const validPatientData = {
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
    
        // Mock para forzar un error en save()
        TestPatient.prototype.save = jest.fn().mockRejectedValue(new Error('Test error'));
    
        // Asegúrate de que el mock se está utilizando
        TestPatient.mockImplementation(() => ({
            save: TestPatient.prototype.save,
            toObject: jest.fn(),
        }));
    
        await expect(createPatientService(validPatientData)).rejects.toThrow('Error al guardar: Test error');
    });

    it('should create a new patient even if optional fields are missing', async () => {
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
            // secondNumberPhone omitted
        };
    
        // Mock countDocuments to return a specific count
        TestPatient.countDocuments = jest.fn().mockResolvedValue(10);
    
        // Mock save and toObject
        TestPatient.prototype.save = jest.fn().mockResolvedValue({
            toObject: jest.fn().mockReturnValue({
                personalInformation: { birthDate: '1992-02-02' },
                cita: { appointmentDate: patientData.cita.appointmentDate },
            }),
        });
    
        const result = await createPatientService(patientData);
    
        expect(result.personalInformation.birthDate).toBe('1992-02-02');
        expect(result.cita.appointmentDate).toBe(patientData.cita.appointmentDate);
        // Puedes agregar más aserciones según sea necesario
    });
    
     
});
