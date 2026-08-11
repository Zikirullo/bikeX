import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URL as string)
  .then((data) => {
    console.log("Database connected");
    const POST = process.env.PORT ?? 3010;
  })
  .catch((err) => console.log("Database connection failed!"));
