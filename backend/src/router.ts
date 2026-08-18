import express from "express";
import { userController } from "./controllers/users.controller";
import storeController from "./controllers/store.controller";
import makeUploader from "./libs/uploads";
import bikesController from "./controllers/bikes.controller";
export const router = express.Router();

// User-related
router.get("/store", storeController.getStore);
router.post("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.post("/user/logout", userController.logout);
router.get(
  "/user/detail",
  userController.verifyUser,
  userController.getUserDetail,
);
router.post(
  "/user/update",
  userController.verifyUser,
  makeUploader("users").single("userImage"),
  userController.update,
);
router.get("/user/top-users", userController.getTopUsers);

// Bikes-related
router.get("/bikes/all", bikesController.getBikes);
router.get("/bike/:id", userController.retriveUser, bikesController.getBike);

// Order-related
