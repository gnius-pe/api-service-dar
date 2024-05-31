import { json } from "express";
import TestPatient from "../models/patient.model.js";

export const getPatients = async (req,res) => {
    const patients = await TestPatient.find();
    res.json(patients)
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

    const personalInformation = {
        "name" : name,
        "lastName" :lastName,
        "numberIdentification" :numberIdentification,
        "email" : email,
        "firtsNumberPhone" : firtsNumberPhone,
        "secondNumberPhone" : secondNumberPhone || "",
        "sexo" : sexo,
        "birthDate" :birthDate
    }

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
        res.json(savePatienr);   
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
    const patient =  await TestPatient.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    });
    if(!patient) return res.status(404).json({
        message: 'Paciente no found'
    });
    res.json(patient);
};


