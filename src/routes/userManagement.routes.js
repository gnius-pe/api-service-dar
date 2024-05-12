import { Router } from "express";
import { createUser, getUser, getUserAll ,updateUser, deleteUser} from "../controllers/userManagement.controller.js";

const router = Router();

/**
 * @swagger
 * /api/user:
 *  post:
 *      summary: crea un usuario
 *      tags:
 *       - Gestion Usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Registro'
 *      responses:
 *          200:
 *              description: nuevo Usuario
 */
router.post('/user',createUser);

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *      summary: Obtienes una mision
 *      tags:
 *       - Gestion Usuario
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id del usuario
 *      responses:
 *          200:
 *              description: Obtienes los atribustos necesarios del usuario
 */
router.get('/user/:id',getUser);

/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: obtienes todos los usuarios
 *      tags:
 *       - Gestion Usuario
 *      responses:
 *          200:
 *              description: listado de usuarios
 */
router.get('/user',getUserAll);

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *      summary: editar al usuario
 *      tags:
 *       - Gestion Usuario
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id del usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Registro'
 *      responses:
 *          200:
 *              description: usuairo actualizado
 */
router.put('/user/:id',updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *      summary: elimina al usuairo
 *      tags:
 *       - Gestion Usuario
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id del usuairo
 *      responses:
 *          204:
 *              description: usuario eliminado
 */
router.delete('/user/:id',deleteUser);

export default router;