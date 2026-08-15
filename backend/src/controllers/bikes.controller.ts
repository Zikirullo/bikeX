import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/errors";
import { BikeInput } from "../libs/types/bike";
import { T } from "../libs/types/common";
import { ExtendedRequest } from "../libs/types/user";
import BikesService from "../models/bike.service";

const bikeService = new BikesService();
const bikesController: T = {};

bikesController.createNewBike = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("createNewBike");

    if (!req.files?.length)
      throw new Errors(
        HttpCode.INTERNAL_SERVER_ERROR,
        Message.SOMETHING_WENT_WRONG,
      );

    const data: BikeInput = req.body;
    data.bikeImages = req.files?.map((ele) => {
      return ele.path;
    });

    await bikeService.createNewBike(data);
    res.send(
      `<script>alert("The product successfully added!"); window.location.replace("/admin/bikes/all") </script>`,
    );
  } catch (err) {
    console.log("Error, createNewBike", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace("/admin") </script>`,
    );
  }
};

export default bikesController;
