import mongoose from "mongoose";

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
    }
})

export default mongoose.model('Mision',misonSchema)