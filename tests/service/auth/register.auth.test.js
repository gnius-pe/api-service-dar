import { registerUserService } from '../../../src/service/auth.service.js';
import User from '../../../src/models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../../../src/libs/jwt.js';
import { jest } from '@jest/globals';

jest.mock('../../../src/models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../../../src/libs/jwt.js');

describe('registerUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user and return user data with token', async () => {
        const mockUser = {
            _id: 'user_id',
            username: 'johndoe',
            email: 'johndoe@example.com',
            role: 'user',
            specialty: 'General',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        User.prototype.save = jest.fn().mockResolvedValue(mockUser);
        bcrypt.hash = jest.fn().mockResolvedValue('hashed_password');
        createAccessToken.mockResolvedValue('mocked_token');

        const result = await registerUserService({
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'password123',
            role: 'user',
            specialty: 'General'
        });

        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(User.prototype.save).toHaveBeenCalled();
        expect(createAccessToken).toHaveBeenCalledWith({ id: 'user_id' });
        expect(result).toEqual({
            id: 'user_id',
            username: 'johndoe',
            email: 'johndoe@example.com',
            role: 'user',
            specialty: 'General',
            createdAt: mockUser.createdAt,
            updatedAt: mockUser.updatedAt,
            token: 'mocked_token'
        });
    });

    it('should handle errors during user registration', async () => {
        User.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(registerUserService({
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'password123',
            role: 'user',
            specialty: 'General'
        })).rejects.toThrow('Database error');
    });
});
