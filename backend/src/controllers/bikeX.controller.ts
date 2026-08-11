import { Request, Response } from "express";
import { T } from "../libs/types/common";

const bikeX: T = {};
bikeX.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

bikeX.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
  } catch (err) {
    console.log("Error, getSignup ", err);
  }
};

bikeX.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};
