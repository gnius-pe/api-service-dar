import { createUserService } from '../../../src/service/userManagement.service.js';
import UserModel from '../../../src/models/user.model.js';
import bcrypt from 'bcryptjs';
import { jest } from '@jest/globals';

jest.mock('../../../src/models/user.model.js');
jest.mock('bcryptjs');

describe('createUserService', () => {
    it('should create a user and return the user data', async () => {
        const userData = {
            numberIdentification: '123456',
            name: 'John',
            lastName: 'Doe',
            birthDate: '1990-01-01',
            firtsNumberPhone: '123456789',
            secondNumberPhone: '987654321',
            sexo: 'M',
            email: 'john.doe@example.com',
            role: 'user',
            specialty: 'General',
        };

        bcrypt.hash.mockResolvedValue('hashed_password');
        UserModel.prototype.save.mockResolvedValue({
            _id: 'user_id',
            role: 'user',
            specialty: 'General',
            organizationEmail: 'john.doe@dar.com',
        });

        const result = await createUserService(userData);

        expect(result).toEqual({
            _id: 'user_id',
            role: 'user',
            specialty: 'General',
            email: 'john.doe@dar.com',
            password: '123456', // Se retorna la contraseña original
        });
    });

    it('should throw an error if user is not saved', async () => {
        const userData = {
            numberIdentification: '123456',
            name: 'John',
            lastName: 'Doe',
        };

        bcrypt.hash.mockResolvedValue('hashed_password');
        UserModel.prototype.save.mockResolvedValue(null);

        await expect(createUserService(userData)).rejects.toThrow('User not saved');
    });

    it('should handle errors during user creation', async () => {
        const userData = {
            numberIdentification: '123456',
            name: 'John',
            lastName: 'Doe',
        };

        bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

        await expect(createUserService(userData)).rejects.toThrow('Hashing error');
    });
});