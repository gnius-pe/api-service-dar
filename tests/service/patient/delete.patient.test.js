import { deletePatientservice } from '../../../src/service/patient.service.js';
import TestPatient from '../../../src/models/patient.model.js';
import { jest } from '@jest/globals';

describe('deletePatientService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a patient successfully', async () => {
        const patientId = 'somePatientId';

        // Mock findByIdAndDelete to return a valid patient
        const mockPatient = { _id: patientId, name: 'John Doe' };
        TestPatient.findByIdAndDelete = jest.fn().mockResolvedValue(mockPatient);

        const result = await deletePatientservice(patientId);

        expect(TestPatient.findByIdAndDelete).toHaveBeenCalledWith(patientId);
        expect(result).toEqual({ message: 'Patient deleted' });
    });

    it('should throw an error if the patient does not exist', async () => {
        const patientId = 'nonExistentPatientId';

        // Mock findByIdAndDelete to return null (patient not found)
        TestPatient.findByIdAndDelete = jest.fn().mockResolvedValue(null);

        await expect(deletePatientservice(patientId)).rejects.toThrow('Patient not found');
    });

    it('should throw an error if something goes wrong during deletion', async () => {
        const patientId = 'somePatientId';

        // Mock findByIdAndDelete to throw an error
        TestPatient.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(deletePatientservice(patientId)).rejects.toThrow('Error deleting patient: Database error');
    });
});
