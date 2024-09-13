import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.port || 5008;

app.use(express.json());
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});