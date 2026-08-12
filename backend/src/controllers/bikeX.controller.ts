import { Request, Response } from "express";
import { T } from "../libs/types/common";

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

export default bikeXController;
