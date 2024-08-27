import { deleteUserService } from '../../../src/service/userManagement.service.js';
import UserModel from '../../../src/models/user.model.js';
import { jest } from '@jest/globals';

jest.mock('../../../src/models/user.model.js');

describe('deleteUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a user successfully', async () => {
        UserModel.findByIdAndDelete = jest.fn().mockResolvedValue({
            _id: 'user1',
            name: 'John Doe'
        });

        const result = await deleteUserService('user1');

        expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith('user1');
        expect(result).toEqual({ message: "User deleted successfully" });
    });

    it('should throw an error if user is not found', async () => {
        UserModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

        await expect(deleteUserService('nonexistentId')).rejects.toThrow('User not found');
    });

    it('should handle errors during user deletion', async () => {
        UserModel.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(deleteUserService('user1')).rejects.toThrow('Error deleting user: Database error');
    });
});
