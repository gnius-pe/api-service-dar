import UserModel from "../../../src/models/user.model.js";
import { changeUserRoleService } from "../../../src/service/userManagement.service.js";

// Mock del modelo UserModel
jest.mock('../../../src/models/user.model.js');

describe('changeUserRoleService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería cambiar el rol de un usuario correctamente', async () => {
        // Datos de prueba
        const userId = '12345';
        const newRole = 'admin';
        const updatedUser = {
            _id: userId,
            role: newRole,
            name: "John Doe",
            email: "johndoe@example.com",
            toObject: jest.fn().mockReturnValue({
                _id: userId,
                role: newRole,
                name: "John Doe",
                email: "johndoe@example.com",
            }),
        };

        // Mock de findByIdAndUpdate
        UserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

        // Llamada al servicio
        const result = await changeUserRoleService(userId, newRole);

        // Verificaciones
        expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
            userId,
            { role: newRole },
            { new: true, runValidators: true }
        );
        expect(result).toEqual({
            _id: userId,
            role: newRole,
            name: "John Doe",
            email: "johndoe@example.com",
        });
    });

    it('debería lanzar un error si el usuario no es encontrado', async () => {
        // Datos de prueba
        const userId = '12345';
        const newRole = 'admin';

        // Mock de findByIdAndUpdate que retorna null
        UserModel.findByIdAndUpdate.mockResolvedValue(null);

        // Verificación de que se lanza un error
        await expect(changeUserRoleService(userId, newRole))
            .rejects
            .toThrow("User not found");
        
        expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
            userId,
            { role: newRole },
            { new: true, runValidators: true }
        );
    });

    it('debería lanzar un error en caso de fallo de base de datos', async () => {
        // Datos de prueba
        const userId = '12345';
        const newRole = 'admin';
        const dbError = new Error("Database failure");

        // Mock de findByIdAndUpdate que lanza un error
        UserModel.findByIdAndUpdate.mockRejectedValue(dbError);

        // Verificación de que se lanza un error
        await expect(changeUserRoleService(userId, newRole))
            .rejects
            .toThrow("Error changing user role: Database failure");
    });
});
