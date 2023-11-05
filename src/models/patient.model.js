import mongoose from "mongoose";


const personalInformationSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true,
        trim: true
    },
    lastName :{
        type: String,
        required: true,
        trim: true
    },
    numberIdentification:{
        type: String
    },
    email:{
        type: String,
        trim: true
    }, 
    firtsNumberPhone: {
        type: String,
        required: true,
        trim: true
    },
    secondNumberPhone:{
        type: String,
        required: true,
        trim: true
    },sexo: {
        type: String,
        required: true,
        trim: true
    },
    birthDate: {
        type: Date,
        required: true,
    }

})

const locationSchema = new mongoose.Schema({
    department: {
      type: String,
      required: true,
      trim: true,
    },
    province:{
        type: String,
        required: true,
        trim: true,
    },
    district:{
        type: String,
        required: true,
        trim: true,
    },
    reference:{
        type: String,
        trim: true,
    }
});


const citaSchema = new mongoose.Schema({
    appointmentDate: {
        type: Date
    },
    specialty: {
        type: String
    },
    appointmentdetail: {
        type: String
    }
});

const questionSchema = new mongoose.Schema({
    questionExamRecent:{
        type: Boolean
    },
    spiritualSupport:{
        type: Boolean
    },
    futureActivities:{
        type: Boolean
    }
});

const testPatientSchema = new mongoose.Schema({
    personalInformation: personalInformationSchema, // Usamos el esquema de paciente
    location: locationSchema, // Usamos el esquema de ubicación
    cita: citaSchema,
    question: questionSchema,
    estate:{
        type: String
    }
  }, {
    timestamps: true,
});

export default mongoose.model("TestPatient",testPatientSchema);