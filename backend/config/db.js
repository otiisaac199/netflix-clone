import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

// Connecting to db
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDb connected: " + conn.connection.host);
  } catch (error) {
    console.log("Error connecting to Mongo: " + error.message);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};
