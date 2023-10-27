import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        await mongoose.connect(
            'mongodb+srv://igor:rpdMbeGU16tHXAQC@dar-cluster.iqyckrq.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log(">>> DB connected")
    }catch (error){
        console.log(error)
    }
}