import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema({
    specialtyName:{
        type : String,
        required : true,
        trim: true,
        unique:true
    },
    description : {
        type: String,
        trim: true,
    },
    code : {
        type: String,
        trim: true,
        unique:true
    },
    availableSlots: {
        type: Number,
        required: true,
        min: 0
    }
},{
    timestamps:true,
})

export default mongoose.model('specialty',specialtySchema);