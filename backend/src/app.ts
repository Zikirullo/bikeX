import express from "express";
import path from "path";
import admin from "./admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

// 01. Entrance:
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

// 02. Sessions:

// 03. View:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 04. Routers
app.use("/admin", admin);

export default app;
