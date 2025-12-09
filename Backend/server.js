import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"; 
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on localhost:${PORT}`);
});