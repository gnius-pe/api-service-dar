import { Router } from "express";
import {quotasBySpecialty, countReport} from "../controllers/reportBySpecialty.controller.js";

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

/**
 * @swagger
 * /api/report/count:
 *  get:
 *      summary: Obtienes numero de cupos, total de inscritos y niños inscritos
 *      tags:
 *       - Report
 *      responses:
 *          200:
 *              description: respuesta al detalle
 */
router.get('/report/count', countReport);


export default router;