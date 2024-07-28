import { json } from "express";
import TestPatient from "../models/patient.model.js";
import { parseStandardDate, parseStandardClient } from "../libs/validations.js";
import { calculateAge, getCurrentDateTime, parseDate } from "../libs/utils.js";
import SpecialtyModel from "../models/specialty.model.js";
import { getPatientsService, getPatientByIdService, createPatientService } from "../service/patient.service.js";
import httpResponses from "../utils/httpResponses.js";

export const getDNIDuplicate = async (req, res) =>{
  try {
    const estateDNI = await TestPatient.findOne({"personalInformation.numberIdentification" : req.params.dni});
    if (estateDNI) {
      res.status(200).json({
        state: true
      });
    } else {
      res.status(404).json({
        state: false
      });
    }
  } catch (error) {
    console.error("waiting error :" + error);
    res.status(500).json({
      message: "waiting error :" + error,
    });
  }
}

export const getPatients = async (req, res) => {
  const option = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  };
  try {
    const result = await getPatientsService(option.page,option.limit);
    res.status(httpResponses.OK.status).json(result);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json(
      { message: "Error fetching patients" }
    );
  }
};

export const createPatient = async (req, res) => {
  try {
    const savePatient = await createPatientService(req.body);
    res.status(httpResponses.CREATED.status).json(savePatient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
      message: "Error fetching patient :" + error,
    });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await getPatientByIdService(req.params.id);
    res.status(httpResponses.OK.status).json(patient);
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
      message: "Error saving patient :" + error,
    });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await TestPatient.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    if (!patient)
      return res.status(404).json({
        message: "Paciente no found",
      });
    res.status(200).json({ message: "eliminated patient" });
  } catch (error) {
    console.error("waiting error :" + error);
    res.status(500).json({
      message: "waiting error :" + error,
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
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
      location: { department, province, district, reference },
      cita: { appointmentDate, specialties, appointmentDetail },
      question: { questionExamRecent, spiritualSupport, futureActivities },
      estate,
    } = req.body;

    const hour = "00:00:00";
    const personalInformation = {
      name: name,
      lastName: lastName,
      numberIdentification: numberIdentification,
      email: email,
      firtsNumberPhone: firtsNumberPhone,
      secondNumberPhone: secondNumberPhone || "",
      sexo: sexo,
      birthDate: birthDate,
    };

    const location = {
      department: department,
      province: province,
      district: district,
      reference: reference,
    };

    const cita = {
      appointmentDate: appointmentDate,
      specialties: specialties || [],
      appointmentDetail: appointmentDetail,
    };

    const question = {
      questionExamRecent: questionExamRecent || false,
      spiritualSupport: spiritualSupport || false,
      futureActivities: futureActivities || false,
    };

    const patient = await TestPatient.findByIdAndUpdate(
      req.params.id,
      {
        personalInformation,
        location,
        cita,
        question,
        estate
      },
      {
        new: true,
      }
    );

    if (!patient)
      return res.status(404).json({
        message: "Patient not found",
      });

    let formatPatient = patient.toObject();
    formatPatient.personalInformation.birthDate = birthDate;
    formatPatient.cita.appointmentDate = appointmentDate;
    res.json(formatPatient);
  } catch (error) {
    console.error("Error updating patient: " + error);
    res.status(500).json({
      message: "Error updating patient: " + error,
    });
  }
};
