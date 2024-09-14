import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
const PORT = process.env.port || 5008;

await connectToDB();

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/products", productRoutes);

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://mern-basic-crud-server-ashy.vercel.app/api",
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      console.log('proxyReq', proxyReq.path);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('proxyRes', proxyRes.statusCode);
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
