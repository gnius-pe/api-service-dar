import { json } from "express";
import TestPatient from "../models/patient.model.js";
import { parseStandardDate, parseStandardClient } from "../libs/validations.js";
import { calculateAge, getCurrentDateTime, parseDate } from "../libs/utils.js";
import pdf from "html-pdf";
import puppeteer from "puppeteer";

export const getDNIDuplicate = async (req, res) =>{
  console.log(req.params.dni)
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
    
    //sumo el total de pacientes + 1 para asignarle un lugar entre los demas docuemntos
    const countPatient = await TestPatient.countDocuments();

    const newPatient = new TestPatient({
      personalInformation,
      location,
      cita,
      question,
      estate,
      numberFile : countPatient + 1
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
  try {
    const patient = await TestPatient.findById(req.params.id);
    if (!patient) return res.status(404).json({message: "Paciente no found"});
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            table,
            th,
            td {
              border: 1px solid black;
              border-collapse: collapse;
            }
            th,
            td {
              padding: 5px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h3>${getCurrentDateTime()}</h3>
          <table style="width: 100%">
            <tr>
              <td rowspan="4"><img src=https://i.postimg.cc/nrBf4PDY/dar.png alt="cer" width="200" height="80" /></td>
              <td colspan="2">Mision "San diego - la Ensenada"</td> 
            </tr>
            <tr>
              <td>Ficha</td>
              <td>${patient.numberFile}</td>
            </tr>
            <tr>
              <td>Registro</td>
              <td>${patient.personalInformation.numberIdentification}</td>
            </tr>
            <tr>
              <td>Estado</td>
              <td>${patient.estate}</td>
            </tr>
          </table>

          <br>

          <table style="width: 100%">
            <tr>
              <td>Registro:</td>
              <td>${patient.personalInformation.numberIdentification}</td>
              <td>Paciente:</td>
              <td>${patient.personalInformation.name} ${
      patient.personalInformation.lastName
    }</td>
              <td>Edad:</td>
              <td>${calculateAge(patient.personalInformation.birthDate)}</td>
            </tr>
            <tr>
              <td>Dirección:</td>
              <td colspan="5">X</td>
            </tr>
            <tr>
              <td>Referencia:</td>
              <td colspan="5">${patient.location.reference}</td>
            </tr>
            <tr>
              <td>Distrito:</td>
              <td>${patient.location.district}</td>
              <td>Provincia:</td>
              <td>${patient.location.province}</td>
              <td>Departamento:</td>
              <td>${patient.location.department}</td>
            </tr>
            <tr>
              <td>DNI:</td>
              <td>${patient.personalInformation.numberIdentification}</td>
              <td>Fecha de nacimiento:</td>
              <td>${parseDate(patient.personalInformation.birthDate)}</td>
              <td>Teléfono 01:</td>
              <td>${patient.personalInformation.firtsNumberPhone}</td>
            </tr>
            <tr>
              <td colspan="6">Areas: ${patient.cita.specialties.map(
                (mySpecialty) => {
                  return mySpecialty.label;
                }
              )}</td>
              
            </tr>
            <tr>
              <td>Ficha:</td>
              <td>${patient.numberFile}</td>
              <td>Fecha:</td>
              <td>${getCurrentDateTime()}</td>
              <td>Cert. médico:</td>
              <td>Si/No</td>
            </tr>
          </table>
          
          <table style="width:100%">
            <tr>
              <td colspan="3" style="border-top: 1px solid black; border-bottom: none;">
                Declaro a todos los efectos que estoy de acuerdo con todos los servicios
                en los que participaré y que autorizo el uso de mi imagen (en fotografía o
                video) en la publicidad del trabajo realizado por la entidad, sin carga
                alguna para ésta.
              </td>
            </tr>
            <tr>
              <td style="border: none;">Fecha: ${getCurrentDateTime()}</td>
              <td style="border: none;">Nombre: ${
                patient.personalInformation.name +
                " " +
                patient.personalInformation.lastName
              }</td>
              <td style="border: none;">Firma:     ---------------------</td>
              <br>
            </tr>
          </table>
          
          <br>

          <table style="width: 100%" >
            <tr>
              <td colspan="5" style="border-top: 1px solid black; border-bottom: none;">A completar por los profesionales:</td>
            </tr>
            <tr>
              <td style="border: none;">Peso:</td>
              <td style="border: none;">Altura:</td>
              <td style="border: none;">P.A.:</td>
              <td style="border: none;">Temperatura:</td>
              <td style="border: none;">Horario:</td>
            </tr>
          </table>

          <br>

          <table style="width: 100%">
            <tr>
              <td colspan="2" style="border: none;">A completar por lo profesionales :</td>
            </tr>
            <tr>
              <td ">Observaiones/Reenvio : ________________________________________________________________
                ___________________________________________________________________________________
                ___________________________________________________________________________________
                <br>
                </td>
            </tr>
            
            <tr>
              <td>Procedimineto: _______________________________________________________________________
                ___________________________________________________________________________________
                ___________________________________________________________________________________
                ___________________________________________________________________________________
                ___________________________________________________________________________________
                ___________________________________________________________________________________
                ___________________________________________________________________________________
                ___________________________________________________________________________________</td>
            </tr>
            
          </table>

          <br>
          <table style="width: 100%">
            <tr>
              <td><br><br><br>Res. Area 1</td>
              <td><br><br><br>Res. Area 2</td>
              <td><br><br><br>Res. Area 3</td>
            </tr>
            <tr>
              <td><br><br><br>Res. Area 4</td>
              <td><br><br><br>Res. Area 5</td>
              <td><br><br><br>Res. Area 6</td>
            </tr>
          </table>
        </body>
      </html>

    `;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: {
        top: '0.3in',
        right: '0.5in',
        bottom: '1in',
        left: '0.5in',
      },
    });

    await browser.close();
    res.writeHead(200,{
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${patient.personalInformation.name}-${patient.personalInformation.numberIdentification}.pdf`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
    /** 
    const options = {
      format: "Letter",
      timeout: 30000,
      border: {
        top: "0.3in", // Margen superior
        right: "0.5in", // Margen derecho
        bottom: "1in", // Margen inferior
        left: "0.5in", // Margen izquierdo
      },
    };
    pdf.create(htmlContent, options).toStream((err, stream) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al generar el PDF");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${
          patient.personalInformation.name +
          "-" +
          patient.personalInformation.numberIdentification
        }.pdf`,
      });
      stream.pipe(res);
    });¨
    */
  } catch (error) {
    console.error("waiting error :" + error);
    res.status(500).json({
      message: "waiting error :" + error,
    });
  }
};
