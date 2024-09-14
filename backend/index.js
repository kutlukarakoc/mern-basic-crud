import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.port || 5008;

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});