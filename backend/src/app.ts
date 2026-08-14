import express, { NextFunction, Request, Response } from "express";
import path from "path";
import admin from "./admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthService from "./models/auth.service";

const authService = new AuthService();

// 01. Entrance:
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3010" }));
app.use(morgan(MORGAN_FORMAT));

// 02. Tokens:

export async function authViewMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.locals.user = null;
      return next();
    }

    const user = await authService.verifyAuth(token);

    res.locals.user = user;

    next();
  } catch (err) {
    console.log("AUTH MIDDLEWARE ERROR:", err);

    res.locals.user = null;

    next();
  }
}
app.use(authViewMiddleware);
// 03. View:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 04. Routers
app.use("/admin", admin);

export default app;
