import express from "express";
import bikeXController from "./controllers/bikeX.controller";
const admin = express.Router();

admin.get("/", bikeXController.goHome);

export default admin;
