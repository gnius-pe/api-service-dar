import TestPatient from "../models/patient.model.js";
import { parseStandardClient } from "../libs/validations.js";
import { calculateAge } from "../libs/utils.js";
import SpecialtyModel from "../models/specialty.model.js";

export const deletePatientservice = async (id) => {
    try {
      const patient = await TestPatient.findByIdAndDelete(id);
      if (!patient) {
        throw new Error("Patient not found");
      }
      return { message: "Patient deleted" };
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw new Error("Error deleting patient: " + error.message);
    }
};

export const checkDNIDuplicateService = async (dni) => {
    try {
      const estateDNI = await TestPatient.findOne({"personalInformation.numberIdentification": dni});
      return estateDNI ? true : false;
    } catch (error) {
      console.error("Error checking DNI duplication:", error);
      throw new Error("Error checking DNI duplication: " + error.message);
    }
};

export const getPatientsService = async (page, limit) => {
    const option = {
      page: page || 1,
      limit: limit || 10,
    };
  
    try {
      const patients = await TestPatient.paginate({}, option);
      // Map through the docs and format the dates
      const formattedDocs = patients.docs.map((patient) => {
        const patientObjet = patient.toObject();
        return {
          ...patientObjet._doc, // Spread the document properties
          _id: patientObjet._id,
          personalInformation: {
            ...patientObjet.personalInformation,
            birthDate: parseStandardClient(patientObjet.personalInformation.birthDate),
            age: calculateAge(patientObjet.personalInformation.birthDate),
          },
          location: {
            ...patientObjet.location,
          },
          cita: {
            ...patientObjet.cita,
            appointmentDate: parseStandardClient(patientObjet.cita.appointmentDate),
          },
          question: {
            ...patientObjet.question,
          },
          estate: patientObjet.estate,
        };
      });
  
      return {
        items: {
          ...patients,
          docs: formattedDocs, // Replace docs with the formatted documents
        },
      };
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw new Error("Error fetching patients");
    }
};

export const getPatientByIdService = async (id) => {
    try {
      const patient = await TestPatient.findById(id);
      if (!patient) {
        throw new Error("Paciente no encontrado");
      }
      return patient;
    } catch (error) {
      console.error("Error fetching patient:", error);
      throw error;
    }
};

export const createPatientService = async (patientData) => {
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
      } = patientData;
  
      const hour = "00:00:00";
      const personalInformation = {
        name,
        lastName,
        numberIdentification,
        email,
        firtsNumberPhone,
        secondNumberPhone: secondNumberPhone || "",
        sexo,
        birthDate,
      };
  
      const location = {
        department,
        province,
        district,
        reference,
      };
  
      const cita = {
        appointmentDate,
        specialties: specialties || [],
        appointmentDetail,
      };
  
      const question = {
        questionExamRecent: questionExamRecent || false,
        spiritualSupport: spiritualSupport || false,
        futureActivities: futureActivities || false,
      };

      for (const { label: specialtyName } of specialties) {
        const specialty = await SpecialtyModel.findOne({ specialtyName });
        if (!specialty || specialty.availableSlots <= 0) {
          throw new Error(`No hay cupos disponibles para la especialidad: ${specialtyName}`);
        }
      }
  
      // Sumo el total de pacientes + 1 para asignarle un lugar entre los demás documentos
      const countPatient = await TestPatient.countDocuments();
  
      const newPatient = new TestPatient({
        personalInformation,
        location,
        cita,
        question,
        estate,
        numberFile: countPatient + 1,
      });
  
      const savedPatient = await newPatient.save();
      let formattedPatient = savedPatient.toObject();
      formattedPatient.personalInformation.birthDate = birthDate;
      formattedPatient.cita.appointmentDate = appointmentDate;


  
      for (const { label: specialtyName } of specialties) {
        const specialty = await SpecialtyModel.findOne({ specialtyName });
        if (specialty) {
          specialty.availableSlots = Math.max(specialty.availableSlots - 1, 0);
          await specialty.save();
          console.log(`Updated ${specialtyName}: new availableSlots = ${specialty.availableSlots}`);
        } else {
          console.log(`Specialty ${specialtyName} not found`);
        }
      }
  
      return formattedPatient;
    } catch (error) {
      console.error("Error al guardar:", error);
      throw new Error("Error al guardar: " + error.message);
    }
};

export const updatePatientService = async (id, patientData) => {
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
      } = patientData;
  
      const personalInformation = {
        name,
        lastName,
        numberIdentification,
        email,
        firtsNumberPhone,
        secondNumberPhone: secondNumberPhone || "",
        sexo,
        birthDate,
      };
  
      const location = {
        department,
        province,
        district,
        reference,
      };
  
      const cita = {
        appointmentDate,
        specialties: specialties || [],
        appointmentDetail,
      };
  
      const question = {
        questionExamRecent: questionExamRecent || false,
        spiritualSupport: spiritualSupport || false,
        futureActivities: futureActivities || false,
      };
  
      const patient = await TestPatient.findByIdAndUpdate(
        id,
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
  
      if (!patient) {
        throw new Error("Patient not found");
      }
  
      let formatPatient = patient.toObject();
      formatPatient.personalInformation.birthDate = birthDate;
      formatPatient.cita.appointmentDate = appointmentDate;
  
      return formatPatient;
    } catch (error) {
      console.error("Error updating patient:", error);
      throw new Error("Error updating patient: " + error.message);
    }
};