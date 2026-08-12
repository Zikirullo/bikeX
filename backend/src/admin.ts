import express from "express";
import bikeXController from "./controllers/bikeX.controller";
const admin = express.Router();

admin.get("/", bikeXController.goHome);
admin.post("/signup", bikeXController.processSignup);
admin.post("/login", bikeXController.processLogin);
admin.post("/logout", bikeXController.logout);
admin.get("/check", bikeXController.check);
admin.get("/verify", bikeXController.verifyAuth);

export default admin;
