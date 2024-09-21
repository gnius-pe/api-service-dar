import { loginUserService } from '../../../src/service/auth.service.js';
import User from '../../../src/models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../../../src/libs/jwt.js';
import { jest } from '@jest/globals';

jest.mock('../../../src/models/user.model.js');
jest.mock('bcryptjs');
jest.mock('../../../src/libs/jwt.js');

describe('loginUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should authenticate user and return user data with token', async () => {
        const mockUser = {
            _id: 'user_id',
            username: 'johndoe',
            email: 'johndoe@example.com',
            password: 'hashed_password',
            role: 'user',
            specialty: 'General',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        User.findOne = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        createAccessToken.mockResolvedValue('mocked_token');

        const result = await loginUserService({
            email: 'johndoe@example.com',
            password: 'password123'
        });

        expect(User.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' });
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
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

    it('should throw an error if user is not found', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);

        await expect(loginUserService({
            email: 'nonexistent@example.com',
            password: 'password123'
        })).rejects.toThrow('User not found');
    });

    it('should throw an error if password is incorrect', async () => {
        const mockUser = {
            _id: 'user_id',
            password: 'hashed_password',
        };

        User.findOne = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compare = jest.fn().mockResolvedValue(false);

        await expect(loginUserService({
            email: 'johndoe@example.com',
            password: 'wrongpassword'
        })).rejects.toThrow('Incorrect password');
    });
});
