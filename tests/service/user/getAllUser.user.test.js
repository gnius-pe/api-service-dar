import { getAllUsersService } from '../../../src/service/userManagement.service.js';
import UserModel from '../../../src/models/user.model.js';
import { jest } from '@jest/globals';
import { parseStandardClient } from '../../../src/libs/validations.js';

jest.mock('../../../src/models/user.model.js');
jest.mock('../../../src/libs/validations.js');

describe('getAllUsersService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return paginated and formatted users', async () => {
        const mockUsers = {
            docs: [
                {
                    _id: 'user1',
                    birthDate: '1990-01-01',
                    name: 'John Doe',
                    toObject: jest.fn().mockReturnValue({
                        _id: 'user1',
                        birthDate: '1990-01-01',
                        name: 'John Doe',
                    })
                }
            ],
            totalDocs: 1,
            limit: 10,
            totalPages: 1,
            page: 1,
            pagingCounter: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
        };

        UserModel.paginate = jest.fn().mockResolvedValue(mockUsers);
        parseStandardClient.mockReturnValue('01-01-1990');

        const result = await getAllUsersService({ page: 1, limit: 10 });

        expect(UserModel.paginate).toHaveBeenCalledWith({}, { page: 1, limit: 10 });
        expect(result.docs[0].birthDate).toBe('01-01-1990');
        expect(result.totalDocs).toBe(1);
    });

    it('should handle errors during user fetching', async () => {
        UserModel.paginate = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(getAllUsersService({ page: 1, limit: 10 })).rejects.toThrow('Error fetching users: Database error');
    });
});
