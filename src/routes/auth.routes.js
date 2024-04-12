import { Router } from "express";
import {login, register, logout , profile} from "../controllers/auth.controller.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Registro:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: correo del usuario nuevo
 *              password:
 *                  type: string
 *                  description: una contra para el usuario
 *              username:
 *                  type: string
 *                  description: un nombre o apodo para el usuario
 *              role:
 *                  type: string
 *                  description: tipo de rol que ejerce dentro del sistema
 *              specialty:
 *                  type: string
 *                  description: solo para los medicos
 *          required:
 *              -email
 *              -password
 *              -username
 *              -role
 *          example:
 *              email: ana.rodriguez@dar.com
 *              password: ana456
 *              username: ana_r
 *              role: medico
 *              specialty: Ginecología
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: correo del usuario
 *              password:
 *                  type: string
 *                  description: la contra sel usuario (.-.)
 *          required:
 *              -email
 *              -password
 *          example:
 *              email: ana.rodriguez@dar.com
 *              password: ana456
 */

/**
 * @swagger
 * /api/register:
 *  post:
 *      summary: crea un nuevo usuario
 *      tags:
 *       - Sesion
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Registro'
 *      responses:
 *          200:
 *              description: nuevo usuario regitrado
 */
router.post('/register', register);

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: ingresa al sistema
 *      tags:
 *       - Sesion
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:  
 *              description: Usuario ingreso con exito
 */
router.post('/login', login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: cerrar sesion
 *     tags:
 *       - Sesion
 *     responses:
 *       200:
 *         description: OK          
 */
router.post('/logout', logout);


router.get('/profile', authRequired, profile);

export default router
