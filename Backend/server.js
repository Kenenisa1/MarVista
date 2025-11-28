import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const DeleteProduct=  await Product.findByIdAndDelete(id);

    if(!DeleteProduct)
    {
        res.status(400).json({success: false, message: "Product not found"})
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.log(`${err}`);
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
