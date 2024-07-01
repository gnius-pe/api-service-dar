import { json } from "express";
import TestPatient from "../models/patient.model.js";
import { parseStandardDate, parseStandardClient } from "../libs/validations.js";
import { calculateAge } from "../libs/utils.js";
import { buildPDF } from "../libs/pdfKit.js";
import puppeteer from "puppeteer";
import pdf from "html-pdf";

export const getPatients = async (req, res) => {
  const option = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
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
          birthDate: parseStandardClient(
            patientObjet.personalInformation.birthDate
          ),
          age: calculateAge(patientObjet.personalInformation.birthDate),
        },
        location: {
          ...patientObjet.location,
        },
        cita: {
          ...patientObjet.cita,
          appointmentDate: parseStandardClient(
            patientObjet.cita.appointmentDate
          ),
        },
        question: {
          ...patientObjet.question,
        },
        estate: patientObjet.estate,
      };
    });

    // Send the modified response
    res.send({
      items: {
        ...patients,
        docs: formattedDocs, // Replace docs with the formatted documents
      },
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Error fetching patients" });
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

export const createPatient = async (req, res) => {
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

    const newPatient = new TestPatient({
      personalInformation,
      location,
      cita,
      question,
      estate,
    });
    const savePatienr = await newPatient.save();
    let formatPatient = savePatienr.toObject();
    formatPatient.personalInformation.birthDate = birthDate;
    formatPatient.cita.appointmentDate = appointmentDate;
    res.json(formatPatient);
  } catch (error) {
    console.error("Error al guardar :" + error);
    res.status(500).json({
      message: "Error al guardar :" + error,
    });
  }
};

export const getPatient = async (req, res) => {
  const patient = await TestPatient.findById(req.params.id);
  if (!patient)
    return res.status(404).json({
      message: "Paciente no found",
    });
  res.json(patient);
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
    cita: { appointmentDate, specialty, appointmentDetail },
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
    birthDate: parseStandardDate(birthDate, hour),
  };

  const location = {
    department: department,
    province: province,
    district: district,
    reference: reference,
  };

  const cita = {
    appointmentDate: parseStandardDate(appointmentDate, hour),
    specialty: specialty,
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
    },
    {
      new: true,
    }
  );
  if (!patient)
    return res.status(404).json({
      message: "Paciente no found",
    });
  let formatPatient = patient.toObject();
  formatPatient.personalInformation.birthDate = birthDate;
  formatPatient.cita.appointmentDate = appointmentDate;
  res.json(formatPatient);
};

export const generatePDF = async (req, res) => {
  /** 
    const stream = res.writeHead(200,{
        "Content-Type" : "application/pdf",
        "Content-Disposition" : "attachment; filename=invoice.pdf"
    })
    buildPDF((data)=>{
        stream.write(data)
    },() =>{
        stream.end()
    });
    */
    const data = {
        fecha: '10/12/2023 10:01',
        numeroFicha: '123456',
        codigo: 'ABCDE',
        nombresPaciente: 'Juan Pérez',
        edad: '30',
        direccion: 'Av. Ejemplo 123',
        referencia: 'Cerca del parque central',
        distrito: 'Lima',
        provincia: 'Lima',
        departamento: 'Lima',
        numeroDNI: '12345678',
        fechaNacimiento: '01/01/1990',
        telefono: '987654321',
        areas: 'Área 1, Área 2, Área 3',
        fechaHora: '10/12/2023 12:00',
        certificadoMedico: 'Si',
        peso: '70 kg',
        altura: '170 cm',
        presionArterial: '120/80 mmHg',
        temperatura: '36.5°C',
        horario: 'Mañana',
        observaciones: 'Sin observaciones adicionales',
        procedimientos: 'Procedimiento A, Procedimiento B, Procedimiento C',
        resArea1: 'Resultado A',
        resArea2: 'Resultado B',
        resArea3: 'Resultado C',
        resArea4: 'Resultado D',
        resArea5: 'Resultado E',
        resArea6: 'Resultado F'
    };
    /** 
  const htmlContent =
    '<!DOCTYPE html> <html> <head> <style> table, th, td { border: 1px solid black; border-collapse: collapse; } th, td { padding: 5px; text-align: left; } </style> </head> <body> <h2>10/12/2023 10:01</h2> <table style="width: 100%"> <tr> <td rowspan="2"> <img src="/template/logo.jpg" alt="cer" width="50" height="50" /> </td> <td colspan="2">Misión "San Diego - La Ensenada"</td> </tr> <tr> <td>Ficha</td> <td>[N° Ficha]</td> </tr> <tr> <td>Registro:</td> <td>[código]</td> </tr> <tr> <td>Estado:</td> <td>[código]</td> </tr> </table> <table> <tr> <td>Registro:</td> <td>[código]</td> <td>Paciente</td> <td>[Nombres y apellidos paciente]</td> <td>Edad:</td> <td>[edad]</td> </tr> <tr> <td>Dirección:</td> <td colspan="5">[Dirección]</td> </tr> <tr> <td>Referencia:</td> <td colspan="5">[Referencia]</td> </tr> <tr> <td>Distrito:</td> <td>[Distrito]</td> <td>Provincia:</td> <td>[Provincia]</td> <td>Departamento:</td> <td>[Departamento]</td> </tr> <tr> <td>DNI:</td> <td>[N° DNI]</td> <td>Fecha de nacimiento:</td> <td>[Fecha deacimiento]</td> <td>Teléfono 01:</td> <td>[N° telefono]</td> </tr> <tr> <td>Areas:</td> <td>[N° Ficha]</td> <td>Fecha:</td> <td>Area01/area02/area03<br />[Fecha y hora]</td> <td>Cert. médico:</td> <td>Si/No</td> </tr> </table> <p> Declaro a todos los efectos que estoy de acuerdo con todos los servicios en los que participaré y que autorizo el uso de mi imagen (en fotografía o video) en la publicidad del trabajo realizado por la entidad, sin carga alguna para ésta. </p> <table style="width: 100%"> <tr> <td>Fecha:</td> <td>Nombre:</td> <td colspan="3">Firma:</td> </tr> </table> <h3>A completar por los profesionales:</h3> <table style="width: 100%"> <tr> <td>Peso:</td> <td>Altura:</td> <td>P.A.:</td> <td>Temperatura:</td> <td>Horario:</td> </tr> </table> <h3>A completar por el responsable técnico:</h3> <table style="width: 100%"> <tr> <td colspan="5">Observaciones/Reenvío</td> </tr> <tr> <td colspan="5">Procedimientos:</td> </tr> </table> <table style="width: 100%"> <tr> <td>Res. Area 1</td> <td>Res. Area 2</td> <td>Res. Area 3</td> </tr> <tr> <td>Res. Area 4</td> <td>Res. Area 5</td> <td>Res. Area 6</td> </tr> </table> </body> </html>'; // Aquí debes proporcionar tu HTML
*/
    const htmlContent = `<!DOCTYPE html>
    <html>
    <head>
        <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 5px;
                text-align: left;
            }
        </style>
    </head>
    <body>
        <h2>${data.fecha}</h2>
        <table style="width: 100%">
            <tr>
                <td rowspan="2"><img src="/template/logo.jpg" alt="Logo" width="50" height="50" /></td>
                <td colspan="2">Misión "San Diego - La Ensenada"</td>
            </tr>
            <tr>
                <td>Ficha</td>
                <td>${data.numeroFicha}</td>
            </tr>
            <tr>
                <td>Registro:</td>
                <td>${data.codigo}</td>
            </tr>
            <!-- Más contenido aquí -->
        </table>
        <!-- Más contenido aquí -->
    </body>
    </html>`;
  pdf.create(htmlContent).toStream((err, stream) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al generar el PDF");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });

    stream.pipe(res);
  });
};
