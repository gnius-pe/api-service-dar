import { json } from "express";
import TestPatient from "../models/patient.model.js";
import {isObjectEmpty} from "../libs/validations.js";

export const getPatients = async (req,res) => {
    const patients = await TestPatient.find();
    res.json(patients)
};

export const createPatient = async (req,res) => { 
    let patientReq = req.body;
    if(isObjectEmpty(patientReq)) return res.status(400).json({
        message: "Faltan datos"
    }); 
    try{
        const newTestPatient = new TestPatient(patientReq);
        const saveTestPatient = await newTestPatient.save();
        res.json(saveTestPatient);
    }catch(error){
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


