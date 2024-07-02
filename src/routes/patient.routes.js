import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getPatients,createPatient,getPatient,updatePatient,deletePatient,generatePDF} from "../controllers/patient.controller.js"
import { validateschema } from "../middlewares/validator.middleware.js";
import {patientSchema} from "../schemas/patient.schema.js";


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
 *                          type: string
 *                          format: date
 *                          description: fecha de nacimiento del paciente
 *              location:
 *                  type: object
 *                  properties:
 *                      department:
 *                          type: string 
 *                          description: departamento del paciente
 *                      province:
 *                          type: string
 *                          description: provincia del paciente
 *                      district:
 *                          type: string
 *                          description: distrito del paciente
 *                      reference:
 *                          type: string
 *                          description: referencia de la ubicación del paciente
 *              cita:
 *                  type: object
 *                  properties:
 *                      appointmentDate:
 *                          type: string
 *                          format: date
 *                          description: fecha de la cita
 *                      specialties:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  specialty:
 *                                      type: string
 *                                      description: especialidad médica
 *                                  value:
 *                                      type: string
 *                                      description: valor asociado a la especialidad
 *                      appointmentDetail:
 *                          type: string
 *                          description: detalles de la cita
 *              question:
 *                  type: object
 *                  properties:
 *                      questionExamRecent:
 *                          type: boolean
 *                          description: indica si ha habido exámenes recientes
 *                      spiritualSupport:
 *                          type: boolean
 *                          description: indica si necesita apoyo espiritual
 *                      futureActivities:
 *                          type: boolean
 *                          description: indica si hay actividades futuras planificadas
 *              estate:
 *                  type: string
 *                  description: estado actual del paciente
 *          required:
 *              - personalInformation
 *              - location
 *              - cita
 *              - question
 *              - estate
 *          example:
 *              personalInformation: 
 *                  name: Carlos
 *                  lastName: Gomez
 *                  numberIdentification: 12345678
 *                  email: carlos.gomez@gmail.com
 *                  firtsNumberPhone: 912345678
 *                  secondNumberPhone: 987654321
 *                  sexo: masculino
 *                  birthDate: 2000-06-21
 *              location:
 *                  department: Lima
 *                  province: Lima
 *                  district: Miraflores
 *                  reference: Cerca del Parque Kennedy
 *              cita:
 *                  appointmentDate: 2024-06-20
 *                  specialties: 
 *                      - specialty: Cardiologia
 *                        value: "1"
 *                      - specialty: Endocrinologia
 *                        value: "3"
 *                  appointmentDetail: Consulta general
 *              question:
 *                  questionExamRecent: false
 *                  spiritualSupport: true
 *                  futureActivities: false
 *              estate: confirmada
 */

/**
 * @swagger
 * /api/patients:
 *  get:
 *      summary: obtienes todos los pacientes
 *      tags:
 *       - Paciente
 *      parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de página (por defecto es 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de elementos por página (por defecto es 10)
 *      responses:
 *          200:
 *              description: listado de pacientes
 */
router.get('/patients',getPatients);

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
router.get('/patient/:id',getPatient);

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
router.post('/patient',validateschema(patientSchema),createPatient);

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
router.delete('/patient/:id',deletePatient);

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
router.put('/patient/:id',updatePatient);
//router.put('/patient/:id',authRequired,updatePatient);

/**
 * @swagger
 * /api/patient-pdf/{id}:
 *  get:
 *      summary: Obtiener pdf
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
 *              description: obtienes un pdf
 */
router.get('/patient-pdf/:id',generatePDF);
export default router;