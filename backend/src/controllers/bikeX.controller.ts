import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { LoginInput, User, UserInput } from "../libs/types/user";
import { AUTH_TIMER } from "../libs/config";
import Errors, { HttpCode } from "../libs/errors";
import UserService from "../models/user.service";
import { UserType } from "../libs/enums/user.enum";
import AuthService from "../models/auth.service";

const userService = new UserService();
const authService = new AuthService();

const bikeXController: T = {};
bikeXController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

bikeXController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
  } catch (err) {
    console.log("Error, getSignup ", err);
  }
};

bikeXController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
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
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ user: result, accessToken: token });
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
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ user: result, accessToken: token });
  } catch (err) {
    console.log("Error, processLogin ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default bikeXController;
