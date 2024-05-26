import { Router } from "express";
import { createUser, getUser, getUserAll ,updateUser, deleteUser} from "../controllers/userManagement.controller.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Usuario:
 *          type: object
 *          properties:
 *              numberIdentification:
 *                  type: string
 *                  description :  DNI del usuario
 *              name:
 *                  type: string
 *                  description: nombre del usuario
 *              lastName:
 *                  type: string
 *                  description: apellidos del usuario
 *              birthDate: 
 *                  type: Date
 *                  description: fecha de nacimineto del usuario
 *              firtsNumberPhone:
 *                  type: string
 *                  description: Prinrcipal numero de celular
 *              secondNumberPhone:
 *                  type: string
 *                  description: numero secundario del usuario (opcional)
 *              sexo:
 *                  type: string
 *                  description: Sexo del usuairo
 *              email:
 *                  type: string
 *                  description: correo del usuario nuevo
 *              specialty:
 *                  type: string
 *                  description: solo para los medicos
 *              role:
 *                  type: string
 *                  description: tipo de rol que ejerce dentro del sistema
 *          required:
 *              -numberIdentification
 *              -name
 *              -lastName
 *              -birthDate
 *              -firtsNumberPhone
 *              -secondNumberPhone
 *              -sexo
 *              -email
 *              -specialty
 *              -role
 *          example:
 *              numberIdentification: "823456789"
 *              name: Ana
 *              lastName: Rodriguez
 *              birthDate: "1985-05-15"
 *              firtsNumberPhone: "987243567"
 *              secondNumberPhone: "964234876"
 *              sexo: Femenino
 *              email: ana.rodriguez@dar.com
 *              specialty: Ginecología
 *              role: medico
 */

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
 *                      $ref: '#/components/schemas/Usuario'
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
 *                      $ref: '#/components/schemas/Usuario'
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