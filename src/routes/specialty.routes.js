import { Router } from "express";
import { 
    createSpecialty, 
    getSpecialties, 
    deletetSpecialty, 
    updateSpecialty, 
    getSpecialty 
} from "../controllers/specialty.controller.js";

const router = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      Specialty:
 *          type: object
 *          properties:
 *              specialtyName:
 *                  type: string
 *                  description: Nombre de la especialidad
 *              description:
 *                  type: string
 *                  description: Descripción de la especialidad
 *              code:
 *                  type: string
 *                  description: Código único de la especialidad
 *          required:
 *              - specialtyName
 *              - description
 *              - code
 *          example:
 *              specialtyName: Cardiología
 *              description: Rama de la medicina que se ocupa del diagnóstico y tratamiento de las enfermedades del corazón y del sistema circulatorio.
 *              code: CAR001
 */

/**DOCUMENTACIÓN DE LAS API EN EL SWAGGER */


/**
 * @swagger
 * /api/specialty/{id}:
 *  get:
 *      summary: Obtiene una especialidad
 *      tags:
 *       - Specialty
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID de la especialidad
 *      responses:
 *          200:
 *              description: Una especialidad al detalle
 */
router.get('/specialty/:id', getSpecialty);


/**
 * @swagger
 * /api/specialty:
 *  get:
 *      summary: Obtiene todas las especialidades
 *      tags:
 *       - Specialty
 *      responses:
 *          200:
 *              description: Listado de especialidades
 */
router.get('/specialty', getSpecialties);


/**
 * @swagger
 * /api/specialty:
 *  post:
 *      summary: Crea una nueva especialidad
 *      tags:
 *       - Specialty
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Specialty'
 *      responses:
 *          201:
 *              description: Nueva especialidad creada
 */
router.post('/specialty', createSpecialty);


/**
 * @swagger
 * /api/specialty/{id}:
 *  put:
 *      summary: Actualiza una especialidad
 *      tags:
 *       - Specialty
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID de la especialidad
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Specialty'
 *      responses:
 *          200:
 *              description: Especialidad actualizada
 */
router.put('/specialty/:id', updateSpecialty);


/**
 * @swagger
 * /api/specialty/{id}:
 *  delete:
 *      summary: Elimina una especialidad
 *      tags:
 *       - Specialty
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID de la especialidad
 *      responses:
 *          204:
 *              description: Especialidad eliminada
 */
router.delete('/specialty/:id', deletetSpecialty);


export default router;