import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/errors";
import { BikeInput, BikeInQuery } from "../libs/types/bike";
import { T } from "../libs/types/common";
import { ExtendedRequest } from "../libs/types/user";
import BikesService from "../models/bikes.service";
import { BikeType } from "../libs/enums/bike.enum";

const bikeService = new BikesService();
const bikesController: T = {};

bikesController.getBikes = async (req: Request, res: Response) => {
  try {
    console.log("getBikes");
    const { order, page, limit, bikeType, search } = req.query;
    const inquery: BikeInQuery = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (bikeType) inquery.bikeType = bikeType as BikeType;
    if (search) inquery.search = String(search);

    const result = await bikeService.getBikes(inquery);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getBikes", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

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

bikesController.getAllBikes = async (req: Request, res: Response) => {
  try {
    console.log("getAllBikes");
    const data = await bikeService.getAllBikes();
    res.render("bikes", { bike: data });
  } catch (err) {
    console.log("Error, getAllProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

bikesController.updateBike = async (req: Request, res: Response) => {
  try {
    console.log("updateBike");
    const id = req.params.id as string;

    const result = await bikeService.updateBike(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateBike", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default bikesController;
