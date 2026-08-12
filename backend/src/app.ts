import express from "express";
import path from "path";
import admin from "./admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import cors from "cors";
import cookieParser from "cookie-parser";

// 01. Entrance:
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan(MORGAN_FORMAT));
app.use(cookieParser());

// 02. Sessions:

// 03. View:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 04. Routers
app.use("/admin", admin);

export default app;
