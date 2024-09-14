import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import proxy from "express-http-proxy";

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

if (process.env.NODE_ENV === "production") {
  app.use("/api", proxy(process.env.MAIN_APP_URL));
}

app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
