import {z} from "zod";

export const misionSchema = z.object({
    nameMision: z.string({
        required_error: "name of the mision is requered"
    }),
    description: z.string().max(254,{
        message: "maximum number of characters 254"
    }),
    startDate : z.string().optional(), 
    finalDate : z.string().optional(),
    stateMison : z.string({
        required_error: "active or deactivated status is required"
    }),
});

