import { z } from "zod";

export const specialtySchema = z.object({
    specialtyName : z.string({
        required_error : "name of the specialty is requered"
    }),
    description: z.string().max(254,{
        message: "maximum number of characters 254"
    }),
    code : z.string({
        required_error: "the code is requered"
    })
})