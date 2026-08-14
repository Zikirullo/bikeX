import express from "express";
import bikeXController from "./controllers/bikeX.controller";
import makeUploader from "./libs/uploads";
const admin = express.Router();

admin.get("/", bikeXController.goHome);
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

export default admin;
