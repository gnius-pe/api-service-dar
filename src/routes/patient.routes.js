import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getPatients,createPatient,getPatient,updatePatient,deletePatient} from "../controllers/patient.controller.js"

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Paciente:
 *          type: object
 *          properties:
 *              personalInformation:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: nombre del paciente
 *                      lastName:
 *                          type: string
 *                          description: apellidos del paciente
 *                      numberIdentification:
 *                          type: string
 *                          description: documento de identidad nacional
 *                      email:
 *                          type: string
 *                          description: correo del paciente
 *                      firtsNumberPhone:
 *                          type: string
 *                          description: primer numero de celular o telefono
 *                      secondNumberPhone:
 *                          type: string
 *                          description: segundo numero de celular o telefono
 *                      sexo:
 *                          type: string
 *                          description: sexo del paciente
 *                      birthDate:
 *                          type: date
 *                          description: fecha de nacimineto del paciente
 *              location:
 *                  type: object
 *                  properties:
 *                      department:
 *                          type: string 
 *                      province:
 *                           type: string
 *                      district:
 *                           type: string  
 *                      reference:
 *                          type: string
 *              cita:
 *                  type: object
 *                  properties:
 *                      appointmentDate:
 *                          type: date
 *                      specialty:
 *                          type: string
 *                      appointmentdetail:
 *                          type: string
 *              questionExamRecent:
 *                  type: boolean  
 *              spiritualSupport:
 *                  type: boolean
 *              futureActivities:
 *                  type: boolean        
 *          required:
 *              -name
 *          
 *              
 */


/**
 * @swagger
 * /api/patients:
 *  get:
 *      summary: obtienes todos los pacientes
 *      tags:
 *       - Paciente
 *      responses:
 *          200:
 *              description: listado de pacientes
 */
router.get('/patients',authRequired,getPatients);

/**
 * @swagger
 * /api/patient/{id}:
 *  get:
 *      summary: Obtienes un paciente
 *      tags:
 *       - Paciente
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id del paciente
 *      responses:
 *          200:
 *              description: un paciente
 */
router.get('/patient/:id',authRequired,getPatient);

/**
 * @swagger
 * /api/patient:
 *  post:
 *      summary: crea un nuevo paciente
 *      tags:
 *       - Paciente
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Paciente'
 *      responses:
 *          200:
 *              description: nuevo paciente
 */
router.post('/patient',authRequired,createPatient);

/**
 * @swagger
 * /api/patient/{id}:
 *  delete:
 *      summary: elimina un paciente
 *      tags:
 *       - Paciente
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id del paciente
 *      responses:
 *          204:
 *              description: paceinte eliminado
 */
router.delete('/patient/:id',authRequired,deletePatient);

/**
 * @swagger
 * /api/patient/{id}:
 *  put:
 *      summary: editar paciente
 *      tags:
 *       - Paciente
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: id del paciente
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Paciente'
 *      responses:
 *          200:
 *              description: paceinte actualizado
 */
router.put('/patient/:id',authRequired,updatePatient);
//router.put('/patient/:id',authRequired,updatePatient);
export default router;