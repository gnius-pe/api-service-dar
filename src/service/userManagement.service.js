import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";

/**
 * Servicio para crear un usuario.
 * @param {Object} userData - Los datos del usuario a crear.
 * @returns {Object} - El usuario creado con algunos campos clave.
 * @throws {Error} - Si ocurre un error durante la creación del usuario.
 */
export const createUserService = async (userData) => {
    const {
        numberIdentification,
        name,
        lastName,
        birthDate,
        firtsNumberPhone,
        secondNumberPhone,
        sexo,
        email,
        role,
        specialty
    } = userData;

    const firtsName = name.split(/\s+/)[0].toLowerCase();
    const fitsLastName = lastName.split(/\s+/)[0].toLowerCase();

    try {
        // Generar hash para la contraseña
        const passwordHash = await bcrypt.hash(numberIdentification, 10);

        // Crear el nuevo usuario
        const newUser = new UserModel({
            numberIdentification,
            name,
            lastName,
            birthDate,
            firtsNumberPhone,
            secondNumberPhone,
            sexo,
            username: name + numberIdentification,
            email,
            organizationEmail: `${firtsName}.${fitsLastName}@dar.com`,
            password: passwordHash,
            role,
            specialty
        });

        // Guardar el usuario en la base de datos
        const userSaved = await newUser.save();

        if (!userSaved) {
            throw new Error("User not saved");
        }

        // Devolver los datos del usuario creado
        return {
            _id: userSaved._id,
            role: userSaved.role,
            specialty: userSaved.specialty,
            email: userSaved.organizationEmail,
            password: numberIdentification,  // Retornar la contraseña original para propósitos de la respuesta
        };

    } catch (error) {
        //console.error("Error creating user:", error);
        throw new Error(error.message);
    }
};

import { parseStandardClient } from "../libs/validations.js";

/**
 * Servicio para obtener todos los usuarios con paginación.
 * @param {Object} query - Los parámetros de consulta que incluyen `page` y `limit`.
 * @returns {Object} - Los usuarios paginados y formateados.
 * @throws {Error} - Si ocurre un error durante la consulta.
 */
export const getAllUsersService = async (query) => {
    try {
        const page = parseInt(query.page) || 1; // Página actual, por defecto es 1
        const limit = parseInt(query.limit) || 10; // Número de usuarios por página
        const options = {
            page: page,
            limit: limit
        };

        // Obtener los usuarios con paginación
        const userAll = await UserModel.paginate({}, options);

        // Formatear los datos de los usuarios
        const userAllFormat = userAll.docs.map(user => {
            const userObj = user.toObject();
            return {
                ...userObj,
                birthDate: parseStandardClient(userObj.birthDate)
            };
        });

        // Formar la respuesta paginada
        const response = {
            docs: userAllFormat,
            totalDocs: userAll.totalDocs,
            limit: userAll.limit,
            totalPages: userAll.totalPages,
            page: userAll.page,
            pagingCounter: userAll.pagingCounter,
            hasPrevPage: userAll.hasPrevPage,
            hasNextPage: userAll.hasNextPage,
            prevPage: userAll.prevPage,
            nextPage: userAll.nextPage
        };

        return response;
    } catch (error) {
        //console.error("Error fetching users:", error.message);
        throw new Error("Error fetching users: " + error.message);
    }
};

/**
 * Servicio para actualizar un usuario.
 * @param {string} userId - El ID del usuario a actualizar.
 * @param {Object} updateData - Los datos a actualizar en el usuario.
 * @returns {Object} - El usuario actualizado.
 * @throws {Error} - Si ocurre un error durante la actualización o el usuario no es encontrado.
 */
export const updateUserService = async (userId, updateData) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
            new: true, // Devuelve el documento modificado en lugar del original
            runValidators: true // Ejecuta las validaciones del esquema en las actualizaciones
        });

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser.toObject();
    } catch (error) {
        //console.error("Error updating user:", error.message);
        throw new Error("Error updating user: " + error.message);
    }
};

export const changeUserRoleService = async (userId, newRole) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            { role: newRole }, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser.toObject();
    } catch (error) {
        throw new Error("Error changing user role: " + error.message);
    }
};


/**
 * Servicio para eliminar un usuario por su ID.
 * @param {string} userId - El ID del usuario a eliminar.
 * @returns {Object} - Un objeto que indica que el usuario fue eliminado.
 * @throws {Error} - Si ocurre un error durante la eliminación o el usuario no es encontrado.
 */
export const deleteUserService = async (userId) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            throw new Error("User not found");
        }

        return { message: "User deleted successfully" };
    } catch (error) {
        //console.error("Error deleting user:", error.message);
        throw new Error("Error deleting user: " + error.message);
    }
};