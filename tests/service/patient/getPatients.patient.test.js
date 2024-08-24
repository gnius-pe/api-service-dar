import { getPatientsService } from '../../../src/service/patient.service.js';
import TestPatient from '../../../src/models/patient.model.js';
import { jest } from '@jest/globals';
import * as utils from '../../../src/libs/utils.js';
import * as validations from '../../../src/libs/validations.js';

describe('getPatientsService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return paginated and formatted patients', async () => {
        const mockPatients = {
            docs: [
                {
                    _id: 'patient1',
                    personalInformation: {
                        birthDate: '1990-01-01',
                        name: 'John Doe',
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
                    toObject: jest.fn().mockReturnValue({
                        _id: 'patient1',
                        personalInformation: {
                            birthDate: '1990-01-01',
                            name: 'John Doe',
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
                    }),
                },
            ],
            totalDocs: 1,
            limit: 10,
            page: 1,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
            nextPage: null,
            prevPage: null,
        };

        // Mock the pagination function
        TestPatient.paginate = jest.fn().mockResolvedValue(mockPatients);

        // Spy on the functions using jest.spyOn
        jest.spyOn(utils, 'calculateAge').mockReturnValue(30);
        jest.spyOn(validations, 'parseStandardClient').mockReturnValue('01-01-1990');

        const result = await getPatientsService(1, 10);

        expect(TestPatient.paginate).toHaveBeenCalledWith({}, { page: 1, limit: 10 });
        expect(result.items.docs[0].personalInformation.birthDate).toBe('01-01-1990');
        expect(result.items.docs[0].personalInformation.age).toBe(30);
        expect(result.items.docs[0].cita.appointmentDate).toBe('01-01-1990');

        // Verifica que las funciones espiadas se hayan llamado correctamente
        expect(validations.parseStandardClient).toHaveBeenCalledWith('1990-01-01');
        expect(utils.calculateAge).toHaveBeenCalledWith('1990-01-01');
    });

    it('should handle errors during pagination', async () => {
        // Mock the paginate method to throw an error
        TestPatient.paginate = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(getPatientsService(1, 10)).rejects.toThrow('Error fetching patients');
    });
});
