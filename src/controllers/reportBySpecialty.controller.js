import PatientModel from "../models/patient.model.js"
import { json } from "express";
import SpecialtyModel from "../models/specialty.model.js";


const specialties = [
    "Medicina",
    "Pediatría",
    "Obstetricia",
    "Nutrición",
    "Odontología",
    "Psicología",
    "Oftalmología",
    "Fisioterapia",
    "Naturopatía",
    "Ecografía"
  ];

export const quotasBySpecialty = async (req, res) => {
    try {
        const results = await Promise.all(specialties.map(async (specialty, index) => {
          const report = await PatientModel.aggregate([
            { $match: { 'cita.specialties.label': specialty } },
            {
              $group: {
                _id: '$estate',
                count: { $sum: 1 },
              },
            },
          ]);
    
          // Transformar el reporte en el formato deseado
          const formattedReport = report.reduce((acc, item) => {
            switch(item._id) {
              case 'CONSULTA':
                acc.consulta = item.count;
                break;
              case 'ATENDIDO':
                acc.atendidos = item.count;
                break;
              case 'PENDIENTE':
                acc.pendientes = item.count;
                break;
              case 'DISPONIBLE':
                acc.disponibles = item.count;
                break;
              default:
                acc[item._id.toLowerCase()] = item.count;
            }
            return acc;
          }, { consulta: 0, atendidos: 0, pendientes: 0, disponibles: 0 });

          const specialtyData = await SpecialtyModel.findOne({specialtyName : specialty});
          const availableSlots = specialtyData ? specialtyData.availableSlots : 0;
    
          return {
            id: index + 1,
            ...formattedReport,
            Especialidad: specialty,
            disponibles: availableSlots
          };
        }));
    
        res.status(200).json(results);
      } catch (error) {
        console.error("waiting error: " + error);
        res.status(500).json({
          message: "waiting error: " + error,
        });
    }
}