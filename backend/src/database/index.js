import mongoose from "mongoose";
import { apiError } from "../utils/apiError.js";
import { configDotenv } from "dotenv";

configDotenv({
    path: "./.env"
})

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async ()=>{
    await mongoose.connect(`${MONGODB_URI}/delhiveryApi`)
    .then(()=>{
        console.log("Databse connnected Successfullly...")
    })
    .catch (err => {
        throw new apiError(401, "Unable to establish Database!", err)
    }) 
}

export {connectDB}