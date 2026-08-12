import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string)
  .then((data) => {
    console.log("Database connected");
    const PORT = process.env.PORT ?? 3010;
    app.listen(PORT, function () {
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => console.log("Database connection failed!"));
