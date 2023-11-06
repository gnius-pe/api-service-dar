import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        await mongoose.connect(
            'mongodb+srv://doadmin:39TGaUD857p241uR@db-dar-a7928a38.mongo.ondigitalocean.com'
        );
        console.log(">>> DB connected")
    }catch (error){
        console.log(error)
    }
}