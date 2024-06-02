import { Router } from "express";
import { getMision, getMisions, deleteMision, createMision, updateMision} from "../controllers/mision.controller.js";
import { validateschema } from "../middlewares/validator.middleware.js";
import {misionSchema} from "../schemas/mision.schema.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Mision:
 *          type: object
 *          properties:
 *              nameMision:
 *                  type: string
 *                  description: nombre de la mision
 *              description:
 *                  type: string
 *                  description: descricion de la mision con 254 caracteres
 *              stateMison:
 *                  type: string
 *                  description: estado de la mision, activo o desactivado
 *              startDate:
 *                  type: date
 *                  description: fecha de inicio de la mision
 *              finalDate:
 *                  type: date
 *                  description: fecha de final de la mision
 *          required:
 *              -nameMision
 *              -description
 *              -stateMison
 *              -startDate
 *              -finalDate
 *          example:
 *              nameMision: Campaña de Donación de Sangre
 *              description: Organizar colectas de sangre y promover la donación voluntaria para garantizar el abastecimiento de sangre en los hospitales y centros de salud.
 *              stateMison: activo
 *              startDate: 2024-01-15T00:00:00.000Z
 *              finalDate: 2024-02-15T00:00:00.000Z
 */

/**DOCUEMTACION DE LAS API EN EL SWAGGER */

/**
 * @swagger
 * /api/misions:
 *  get:
 *      summary: obtienes todos las misiones
 *      tags:
 *       - Mision
 *      parameters:
    *       - in: query
    *         name: page
    *         schema:
    *          type: integer
    *         required: false
    *         description: Número de página (por defecto es 1)
    *       - in: query
    *         name: limit
    *         schema:
    *          type: integer
    *         required: false
    *         description: Número de elementos por página (por defecto es 10)
 *      responses:
 *          200:
 *              description: listado de misiones que se llevaron acabo
 */
router.get('/misions',getMisions);

/**
 * @swagger
 * /api/mision/{id}:
 *  get:
 *      summary: Obtienes una mision
 *      tags:
 *       - Mision
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id de la mision
 *      responses:
 *          200:
 *              description: una mision al detalle
 */
router.get('/mision/:id',getMision);

/**
 * @swagger
 * /api/mision/{id}:
 *  put:
 *      summary: editar una mision
 *      tags:
 *       - Mision
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id de la mision
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Mision'
 *      responses:
 *          200:
 *              description: mision actualizado
 */
router.put('/mision/:id', validateschema(misionSchema),updateMision);

/**
 * @swagger
 * /api/mision:
 *  post:
 *      summary: crea un nueva mision
 *      tags:
 *       - Mision
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Mision'
 *      responses:
 *          200:
 *              description: nueva mision
 */
router.post('/mision', validateschema(misionSchema) ,createMision);

/**
 * @swagger
 * /api/mision/{id}:
 *  delete:
 *      summary: elimina la mision
 *      tags:
 *       - Mision
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id de la mision
 *      responses:
 *          204:
 *              description: mision eliminado
 */
router.delete('/mision/:id',deleteMision);



export default router;