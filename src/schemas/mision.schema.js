import {z} from "zod";

export const misionSchema = z.object({
    nameMision: z.string({
        required_error: "name of the mision is requered"
    }),
    description: z.string().max(254,{
        message: "maximum number of characters 254"
    }),
    startDate : z.string().refine(value => {
        const dateObject = new Date(value);
        return Object.prototype.toString.call(dateObject) === "[object Date]" && !isNaN(dateObject.getTime());
      }, {
        message: "startDate must be a valid date",
        required_error: "startDate is required"
    }), 
    finalDate : z.string().refine(value => {
        const dateObject = new Date(value);
        return Object.prototype.toString.call(dateObject) === "[object Date]" && !isNaN(dateObject.getTime());
      }, {
        message: "finalDate must be a valid date",
        required_error: "finalDate is required"
    }),
    stateMison : z.string({
        required_error: "active or deactivated status is required"
    }),
});

