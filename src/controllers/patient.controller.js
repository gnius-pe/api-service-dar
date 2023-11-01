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
          birthDate,
        },
        location: {
          department,
          province,
          district,
          reference,
        },
        cita:{
            appointmentDate,
            specialty,
            appointmentdetail,
        },question:{
            questionExamRecent,
            spiritualSupport,
            futureActivities,
        },
        estate,
      } = req.body;
      
      const patientData = {
        personalInformation: {
            name,
            lastName,
            numberIdentification,
            email,
            firtsNumberPhone,
            secondNumberPhone,
            sexo,
            birthDate,
        },
        location: {
          department,
          province,
          district,
          reference,
        },
        cita:{
            appointmentDate,
            specialty,
            appointmentdetail,
        },
        question:{
            questionExamRecent,
            spiritualSupport,
            futureActivities,
        },
        estate,
      };
      
    const newTestPatient = new TestPatient(patientData);
    const saveTestPatient = await newTestPatient.save();
    
    /*
    ejemplo :u
    const {name, lastName, numberIdentification,email, firtsNumberPhone, birthDate } = req.body;
    const newPatient = new Patient({
        name,
        lastName,
        numberIdentification,
        email,
        firtsNumberPhone,
        birthDate
    })
    const savePatient = await newPatient.save();
    res.json(savePatient);
    */
   //console.log(completoObject);
   
   res.json(saveTestPatient);
};

export const getPatient = async (req,res) => {
    const patient =  await TestPatient.findById(req.params.id);
    if(!patient) return res.status(404).json({
        message: 'Paciente no found'
    });
    res.json(patient);
};

export const deletePatient = async (req,res) => {
    console.log(req.params.id)
    const patient =  await TestPatient.findByIdAndDelete(req.params.id);
    if(!patient) return res.status(404).json({
        message: 'Paciente no found'
    });
    res.sendStatus(204);
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


