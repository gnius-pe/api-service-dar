import { Router } from "express";
import {quotasBySpecialty} from "../controllers/reportBySpecialty.controller.js";

const router = Router();

/**
 * @swagger
 * /api/report/specialty:
 *  get:
 *      summary: Obtiene detalles de los cupos por especialidad
 *      tags:
 *       - Report
 *      responses:
 *          200:
 *              description: Listado de especialidades
 */
router.get('/report/specialty', quotasBySpecialty);


export default router;