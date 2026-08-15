import { NextFunction, Request, Response } from "express";
import AuthService from "../models/auth.service";
import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/errors";
import { T } from "../libs/types/common";
import {
  ExtendedRequest,
  LoginInput,
  User,
  UserInput,
} from "../libs/types/user";
import UserService from "../models/user.service";

const authService = new AuthService();
export const userController: T = {};
const userService = new UserService();

userController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");

    const input: UserInput = req.body,
      result: User = await userService.signup(input);
    const token = await authService.createToken(result);
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ user: result, accessToken: token });
  } catch (err) {
    console.log("Error, signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");

    const input: LoginInput = req.body,
      result = await userService.login(input),
      token = await authService.createToken(result);
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ user: result, accessToken: token });
  } catch (err) {
    console.log("Error, login ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("Error, logout ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await userService.getUsers();

    res.render("users", { users: result });
  } catch (err) {
    console.log("Error, getUsers", err);
    res.redirect("/admin/login");
  }
};

userController.updateUser = async (req: Request, res: Response) => {
  try {
    console.log("updateUser");
    const result = await userService.updateUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// Authentication

userController.verifyUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("verifyUser");

    const token = req.cookies["accessToken"];
    if (token) req.user = await authService.verifyAuth(token);
    if (!req.user)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
    next();
  } catch (err) {
    console.log("ERROR, verifyAuth", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

userController.retriveUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("retriveAuth");

    const token = req.cookies["accessToken"];
    if (token) req.user = await authService.verifyAuth(token);
    next();
  } catch (err) {
    console.log("ERROR, retriveAuth", err);
    next();
  }
};
