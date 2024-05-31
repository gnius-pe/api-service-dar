import {z} from "zod";

const personalInformationSchema  = z.object(
    {

    name : z.string({
        required_error : "name of patient is requered"
    }),
    lastName : z.string({
        required_error : "lastName of patient is requered"
    }),
    numberIdentification : z.string({
        required_error : "numberIdentification of patient is required"
    }),
    email : z.string({
        required_error : "email of patient is requered"
    }),
    firtsNumberPhone : z.string({
        required_error : "firtsNumberPhone of patient is requered"
    }),
    secondNumberPhone : z.string().optional(),
    sexo : z.string ({
        required_error : "sexo of patient is requerid"
    }),
    birthDate : z.string ().optional()
});

const locationSchema = z.object({
    department: z.string({
        required_error: "department is required"
    }),
    province: z.string({
        required_error: "province is required"
    }),
    district: z.string({
        required_error: "district is required"
    }),
    reference: z.string().optional()
});

const citaSchema = z.object({
    appointmentDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "appointmentDate must be a valid date"
    }).optional(),
    specialty: z.string().optional(),
    appointmentDetail: z.string().optional()
});

const questionSchema = z.object({
    questionExamRecent: z.boolean().optional(),
    spiritualSupport: z.boolean().optional(),
    futureActivities: z.boolean().optional()
});

// Esquema principal que combina los anteriores
export const patientSchema = z.object({
    personalInformation: personalInformationSchema,
    location: locationSchema,
    cita: citaSchema,
    question: questionSchema,
    estate: z.string().optional()
});
