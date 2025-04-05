import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const mongoUri = process.env.MONGODB

const initializeDatabase = async()=>{
    await mongoose.connect(mongoUri).then(()=>{
console.log("Connected to database.")
    }).catch((error)=>console.log("Error Connecting to database"))
}

export {initializeDatabase}
