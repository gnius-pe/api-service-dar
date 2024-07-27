import PatientModel from "../models/patient.model.js"
import { json } from "express";

export const quotasBySpecialty = async (req, res) => {
    const { nameSpecialty } = req.params;
    try {
        const report = await PatientModel.aggregate([
            { $match: { 'cita.specialties.label': nameSpecialty } },
            {
              $group: {
                _id: '$estate',
                count: { $sum: 1 },
              },
            },
          ]);
      
          res.status(200).json({
            specialty: nameSpecialty,
            report,
          });
    } catch (error) {
        console.error("waiting error :" + error);
        res.status(500).json({
            message: "waiting error :" + error,
        });
    }
}