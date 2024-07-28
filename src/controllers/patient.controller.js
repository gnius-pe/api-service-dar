import httpResponses from "../utils/httpResponses.js";
import { 
  getPatientsService,
  getPatientByIdService, 
  createPatientService, 
  updatePatientService,
  checkDNIDuplicateService,
  deletePatientservice } from "../service/patient.service.js";

export const getDNIDuplicate = async (req, res) =>{
  try {
    const isDuplicate = await checkDNIDuplicateService(req.params.dni);
    if(isDuplicate){
      res.status(httpResponses.OK.status).json({
        state : true
      });
    }else{
      res.status(httpResponses.NOT_FOUND.status).json({
        state : false
      })
    }
  } catch (error) {
    console.error("waiting error :" + error);
    res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
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
    const result = await deletePatientservice(req.params.id);
    res.status(httpResponses.OK.status).json(result);
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
      message: "Error deleting patient: " + error.message,
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const updatePatient = await updatePatientService(req.params.id,req.body);
    res.status(httpResponses.OK.status).json(updatePatient);
  } catch (error) {
    console.error("Error updating patient: " + error);
    res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
      message: "Error updating patient: " + error.message,
    });
  }
};