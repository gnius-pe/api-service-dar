import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

/**
 * Servicio para autenticar un usuario y generar un token JWT.
 * @param {Object} credentials - Las credenciales del usuario (email y password).
 * @returns {Object} - Los detalles del usuario autenticado y el token.
 * @throws {Error} - Si ocurre un error durante la autenticación.
 */
export const loginUserService = async ({ email, password }) => {
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            throw new Error("Incorrect password");
        }

        const token = await createAccessToken({ id: userFound._id });

        return {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
            specialty: userFound.specialty,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            token
        };
    } catch (error) {
        //console.error("Error during login:", error.message);
        throw new Error(error.message);
    }
};


/**
 * Servicio para registrar un nuevo usuario.
 * @param {Object} userData - Los datos del usuario a registrar (email, password, username, role, specialty).
 * @returns {Object} - Los detalles del usuario registrado y el token.
 * @throws {Error} - Si ocurre un error durante el registro.
 */
export const registerUserService = async ({ email, password, username, role, specialty }) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
            specialty
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        return {
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            role: userSaved.role,
            specialty: userSaved.specialty,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
            token
        };
    } catch (error) {
        //console.error("Error during user registration:", error.message);
        throw new Error(error.message);
    }
};