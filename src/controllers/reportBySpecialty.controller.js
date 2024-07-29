import { quotasBySpecialtyService,getPatientReport } from "../service/reportBySpecialty.service.js";
import httpResponses from "../utils/httpResponses.js";

export const quotasBySpecialty = async (req, res) => {
    try {
        const results = await quotasBySpecialtyService();
        res.status(httpResponses.OK.status).json(results);
      } catch (error) {
        console.error("waiting error: " + error);
        res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
          message: "waiting error: " + error,
        });
    }
}

export const countReport = async (req,res) => {
  try {
    const reportPatient = await getPatientReport();
    res.status(httpResponses.OK.status).json(reportPatient)
  } catch (error) {
    console.error("waiting error: " + error);
    res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
      message: "waiting error: " + error,
    });
  }
}