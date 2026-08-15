import express from "express";
import { userController } from "./controllers/users.controller";
export const router = express.Router();

router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.post("/user/logout", userController.logout);
