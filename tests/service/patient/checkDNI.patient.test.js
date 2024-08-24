import { checkDNIDuplicateService } from '../../../src/service/patient.service.js';
import TestPatient from '../../../src/models/patient.model.js';
import { jest } from '@jest/globals';

describe('checkDNIDuplicateService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if DNI is duplicated', async () => {
        const dni = '12345678';

        // Mock findOne to return a valid patient
        const mockPatient = { _id: 'somePatientId', personalInformation: { numberIdentification: dni } };
        TestPatient.findOne = jest.fn().mockResolvedValue(mockPatient);

        const result = await checkDNIDuplicateService(dni);

        expect(TestPatient.findOne).toHaveBeenCalledWith({"personalInformation.numberIdentification": dni});
        expect(result).toBe(true);
    });

    it('should return false if DNI is not duplicated', async () => {
        const dni = '87654321';

        // Mock findOne to return null (no patient found)
        TestPatient.findOne = jest.fn().mockResolvedValue(null);

        const result = await checkDNIDuplicateService(dni);

        expect(TestPatient.findOne).toHaveBeenCalledWith({"personalInformation.numberIdentification": dni});
        expect(result).toBe(false);
    });

    it('should throw an error if something goes wrong during the check', async () => {
        const dni = '12345678';

        // Mock findOne to throw an error
        TestPatient.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(checkDNIDuplicateService(dni)).rejects.toThrow('Database error');
    });
});
