import mongoose from "mongoose";
import mogoosePaginate from "mongoose-paginate-v2";

const misonSchema = new mongoose.Schema({
    nameMision : {
        type: String,
        required: true,
        trim: true,
    },
    description : {
        type: String,
        trim: true,
    },
    startDate : {
        type: Date,
        required: true, 
    },
    finalDate : {
        type: Date,
        required: true, 
    },
    stateMison : {
        type: String,
    },
    nationality :{
        type: String
    }, 
    department :{
        type: String
    }, 
    district :{
        type: String
    },
})

misonSchema.plugin(mogoosePaginate);
export default mongoose.model('Mision',misonSchema)