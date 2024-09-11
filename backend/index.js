import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.port || 5008;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});