import express from 'express';
import dotenv from 'dotenv';
// import { connectToDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.port || 5008;

const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.options('', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process if the connection fails
  }
  console.log(`Server is running on port ${PORT}`);
});