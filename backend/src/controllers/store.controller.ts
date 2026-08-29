import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import {
  ExtendedRequest,
  LoginInput,
  User,
  UserInput,
} from "../libs/types/user";
import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/errors";
import UserService from "../models/user.service";
import { UserType } from "../libs/enums/user.enum";
import AuthService from "../models/auth.service";
import BikesService from "../models/bikes.service";

const userService = new UserService();
const authService = new AuthService();
const bikesService = new BikesService();

const bikeXController: T = {};
bikeXController.goHome = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("goHome");
    const bikeStats = await bikesService.bikeStatistics();
    const userStats = await userService.userStatistics();
    console.log("bikeStats passes->", bikeStats);
    console.log("userStats passes->", userStats);

    res.render("home", { user: req.user, bikeStats, userStats });
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

bikeXController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error, getSignup ", err);
  }
};

bikeXController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

bikeXController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    const input: UserInput = req.body;
    input.userType = UserType.ADMIN;
    const result: User = await userService.processSignup(input);
    const token = await authService.createToken(result);
    res.cookie("adminAccessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: true,
    });

    res.redirect("/admin");
  } catch (err) {
    console.log("Error, processSignup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

bikeXController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    const input: LoginInput = req.body,
      result = await userService.processLogin(input),
      token = await authService.createToken(result);
    res.cookie("adminAccessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: true,
    });

    res.redirect("/admin");
  } catch (err) {
    console.log("Error, processLogin ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

bikeXController.logout = (req: Request, res: Response) => {
  try {
    console.log("logout");
    res.cookie("adminAccessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("Error, logout ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

bikeXController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.["adminAccessToken"];
    if (!token) throw new Error("no token");

    const user = await authService.verifyAuth(token);

    if (user?.userType === UserType.ADMIN) {
      req.user = user;
      next();
    } else {
      throw new Error("You're not a store, please leave this page");
    }
  } catch (err) {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`,
    );
  }
};

bikeXController.check = async (req: ExtendedRequest, res: Response) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const admin = await authService.verifyAuth(token);

    res.status(200).json({
      success: true,
      admin: admin.userType === "ADMIN" ? "ADMIN" : "USER",
      userNick: admin.userNick,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

bikeXController.getStore = async (req: Request, res: Response) => {
  try {
    console.log("getStore");

    const result = await bikesService.getStore();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getStore", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default bikeXController;
