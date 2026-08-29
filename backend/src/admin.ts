import express from "express";
import bikeXController from "./controllers/store.controller";
import makeUploader from "./libs/uploads";
import bikesController from "./controllers/bikes.controller";
import multer from "multer";
import { userController } from "./controllers/users.controller";
const admin = express.Router();

admin.get("/", bikeXController.verifyAuth, bikeXController.goHome);
admin
  .get("/signup", bikeXController.getSignup)
  .post(
    "/signup",
    makeUploader("users").single("userImage"),
    bikeXController.processSignup,
  );
admin
  .get("/login", bikeXController.getLogin)
  .post("/login", bikeXController.processLogin);
admin.get("/logout", bikeXController.logout);
admin.get("/check", bikeXController.check);
admin.get("/verify", bikeXController.verifyAuth);

admin.post(
  "/create/bike",
  bikeXController.verifyAuth,
  makeUploader("bikes").array("bikeImages", 5),
  bikesController.createNewBike,
);
admin.get(
  "/bikes/all",
  bikeXController.verifyAuth,
  bikesController.getAllBikes,
);
admin.get("/user/all", bikeXController.verifyAuth, userController.getUsers);
admin.post("/bike/:id", bikeXController.verifyAuth, bikesController.updateBike);
admin.post(
  "/update/user",
  bikeXController.verifyAuth,
  userController.updateUser,
);

export default admin;
