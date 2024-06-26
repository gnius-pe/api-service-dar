import mongoose from "mongoose";
import mogoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
    numberIdentification:{
        type: String,
        required: true
    },
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
    birthDate: {
        type: Date,
        required: true,
    },
    firtsNumberPhone: {
        type: String,
        required: true,
        trim: true
    },
    secondNumberPhone:{
        type: String
    },
    sexo: {
        type: String,
        required: true,
        trim: true
    },
    username : {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    organizationEmail :{
        type: String,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    specialty:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
},{
    timestamps:true
})

userSchema.plugin(mogoosePaginate);
export default mongoose.model('User',userSchema)