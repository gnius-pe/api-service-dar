import { json } from "express";
import TestPatient from "../models/patient.model.js";
import {parseStandardDate ,parseStandardClient} from "../libs/validations.js";

export const getPatients = async (req,res) => {
    const option = {
        page : req.query.page || 1,
        limit : req.query.limit || 10
    };

    try {
        const patients = await TestPatient.paginate({}, option);
    
        // Map through the docs and format the dates
        const formattedDocs = patients.docs.map(patient => {
            const patientObjet = patient.toObject();
            return {
                ...patientObjet._doc, // Spread the document properties
                personalInformation: {
                ...patientObjet.personalInformation,
                birthDate: parseStandardClient(patientObjet.personalInformation.birthDate)
                },
                cita: {
                ...patientObjet.cita,
                appointmentDate: parseStandardClient(patientObjet.cita.appointmentDate)
                }
            };
        });
    
        // Send the modified response
        res.send({
          items: {
            ...patients,
            docs: formattedDocs // Replace docs with the formatted documents
          }
        });
      } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Error fetching patients' });
      }

    /** 

    let reqPatients = patients.map(patient=>{
        let patientObjet = patient.toObject();
        patientObjet.personalInformation.birthDate = parseStandardClient(patientObjet.personalInformation.birthDate);
        patientObjet.cita.appointmentDate = parseStandardClient(patientObjet.cita.appointmentDate);
        return patientObjet;
    })
    */
    //res.json("reqPatients")
};

export const createPatient = async (req,res) => { 
    const {
        personalInformation: {
            name,
            lastName,
            numberIdentification,
            email,
            firtsNumberPhone,
            secondNumberPhone,
            sexo,
            birthDate
        },
        location: {
            department,
            province,
            district,
            reference
        },
        cita: {
            appointmentDate,
            specialty,
            appointmentDetail
        },
        question: {
            questionExamRecent,
            spiritualSupport,
            futureActivities
        },
        estate
    } = req.body;
    const hour = "00:00:00";
    const personalInformation = {
        "name" : name,
        "lastName" :lastName,
        "numberIdentification" :numberIdentification,
        "email" : email,
        "firtsNumberPhone" : firtsNumberPhone,
        "secondNumberPhone" : secondNumberPhone || "",
        "sexo" : sexo,
        "birthDate" : birthDate
    }
    console.log(personalInformation)

    const location = {
        "department" : department,
        "province" : province,
        "district" : district,
        "reference" : reference
    }

    const cita = {
        "appointmentDate" : appointmentDate,
        "specialty" : specialty,
        "appointmentDetail" : appointmentDetail
    }

    const question = {
        "questionExamRecent" :questionExamRecent || false,
        "spiritualSupport" : spiritualSupport || false,
        "futureActivities" : futureActivities || false
    }

    try {
        const newPatient = new TestPatient({personalInformation, location, cita, question, estate});
        const savePatienr = await newPatient.save();
        let formatPatient = savePatienr.toObject();
        formatPatient.personalInformation.birthDate = birthDate;
        formatPatient.cita.appointmentDate = appointmentDate
        res.json(formatPatient);   
    } catch (error) {
        console.error('Error al guardar :' + error);
        res.status(500).json({
            message:'Error al guardar :' + error
        });
    }
};

export const getPatient = async (req,res) => {
    const patient =  await TestPatient.findById(req.params.id);
    if(!patient) return res.status(404).json({
        message: 'Paciente no found'
    });
    res.json(patient);
};

export const deletePatient = async (req,res) => {
    const patient =  await TestPatient.findByIdAndDelete(req.params.id);
    if(!patient) return res.status(404).json({
        message: 'Paciente no found'
    });
    res.sendStatus(204).json({message: 'eliminado'});
};

export const updatePatient = async (req,res) => {
    const {
        personalInformation: {
            name,
            lastName,
            numberIdentification,
            email,
            firtsNumberPhone,
            secondNumberPhone,
            sexo,
            birthDate
        },
        location: {
            department,
            province,
            district,
            reference
        },
        cita: {
            appointmentDate,
            specialty,
            appointmentDetail
        },
        question: {
            questionExamRecent,
            spiritualSupport,
            futureActivities
        },
        estate
    } = req.body;
    const hour = "00:00:00";
    const personalInformation = {
        "name" : name,
        "lastName" :lastName,
        "numberIdentification" :numberIdentification,
        "email" : email,
        "firtsNumberPhone" : firtsNumberPhone,
        "secondNumberPhone" : secondNumberPhone || "",
        "sexo" : sexo,
        "birthDate" : parseStandardDate(birthDate,hour)
    }

    const location = {
        "department" : department,
        "province" : province,
        "district" : district,
        "reference" : reference
    }

    const cita = {
        "appointmentDate" : parseStandardDate(appointmentDate,hour),
        "specialty" : specialty,
        "appointmentDetail" : appointmentDetail
    }

    const question = {
        "questionExamRecent" :questionExamRecent || false,
        "spiritualSupport" : spiritualSupport || false,
        "futureActivities" : futureActivities || false
    }
    const patient =  await TestPatient.findByIdAndUpdate(req.params.id, {
        personalInformation,
        location,
        cita,
        question
    }, {
        new:true
    });
    if(!patient) return res.status(404).json({
        message: 'Paciente no found'
    });
    let formatPatient = patient.toObject();
    formatPatient.personalInformation.birthDate = birthDate;
    formatPatient.cita.appointmentDate = appointmentDate
    res.json(formatPatient);
};


