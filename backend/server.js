import express from "express";
import authRoutes from "./routes/authRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import dotenv from "dotenv";


dotenv.config();
const app = express();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
// console.log(PORT)
app.listen(PORT, () => {
  console.log("Serverrrrrrrrr in", PORT);
  connectMongoDB();
});
