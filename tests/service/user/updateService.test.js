import { updateUserService } from '../../../src/service/userManagement.service.js';
import UserModel from '../../../src/models/user.model.js';
import { jest } from '@jest/globals';

jest.mock('../../../src/models/user.model.js');

describe('updateUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update a user successfully', async () => {
        const mockUpdatedUser = {
            _id: 'user1',
            name: 'Updated Name',
            lastName: 'Updated Last Name',
            email: 'updated.email@example.com'
        };

        UserModel.findByIdAndUpdate = jest.fn().mockResolvedValue({
            toObject: jest.fn().mockReturnValue(mockUpdatedUser)
        });

        const result = await updateUserService('user1', {
            name: 'Updated Name',
            lastName: 'Updated Last Name',
            email: 'updated.email@example.com'
        });

        expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith('user1', {
            name: 'Updated Name',
            lastName: 'Updated Last Name',
            email: 'updated.email@example.com'
        }, { new: true, runValidators: true });
        
        expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw an error if user is not found', async () => {
        UserModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

        await expect(updateUserService('nonexistentId', {})).rejects.toThrow('User not found');
    });

    it('should handle errors during user update', async () => {
        UserModel.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(updateUserService('user1', {})).rejects.toThrow('Error updating user: Database error');
    });
});
