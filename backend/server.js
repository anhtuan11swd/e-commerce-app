import cors from "cors";
import express from "express";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

const app = express();
const port = process.env.PORT || 4000;

// Kết nối database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.get("/", (_req, res) => res.send("API đang hoạt động"));

app.listen(port, () => console.log("Máy chủ đã khởi động trên PORT:", port));
