import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ES modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from project root
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

export const connectDB = async () => {
  try {
    // Validate MongoDB connection string
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is required");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(` Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(` Database Connection Failed: ${error.message}`);
    process.exit(1);
  }
};