import { Router } from "express";
import { verifyPhoneNumber,checkPhoneNumber } from "../controllers/verifyNumber.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Verify:
 *          type: object
 *          properties:
 *              number:
 *                  type: string
 *                  description: correo del usuario
 *          required:
 *              -number
 *          example:
 *              number: "+51929417416"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Check:
 *          type: object
 *          properties:
 *              number:
 *                  type: string
 *                  description: correo del usuario
 *              code:
 *                  type: string
 *                  description: codigo decibo en tu bandeja de SMS
 *          required:
 *              -number
 *              -code
 *          example:
 *              number: "+51929417416"
 *              code: "325632"
 */


/**
 * @swagger
 * /api/v1/verify:
 *  post:
 *      summary: Envia un codigo SMS al numero
 *      tags:
 *       - Verificacion
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Verify'
 *      responses:
 *          200:
 *              status: pending
 */
router.post('/verify',verifyPhoneNumber);

/**
 * @swagger
 * /api/v1/check:
 *  post:
 *      summary: Valida el codigo recivido
 *      tags:
 *       - Verificacion
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Check'
 *      responses:
 *          200:
 *              status: approved
 */
router.post('/check', checkPhoneNumber);

export default router;