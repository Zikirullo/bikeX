import { T } from "../libs/types/common";
import { Response } from "express";
import { OrderInquery, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";
import OrderService from "../models/order.service";
import { ExtendedRequest } from "../libs/types/user";
import Errors, { HttpCode } from "../libs/errors";

const orderController: T = {};
const orderService = new OrderService();

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("createOrder");
    const result = await orderService.createOrder(req.user, req.body);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    try {
      console.log("createOrder");
    } catch (err) {
      console.log("Error, createOrder", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getMyOrders");
    const { page, limit, orderStatus } = req.query;
    const inquery: OrderInquery = {
      page: Number(page),
      limit: Number(limit),
      orderStatus: orderStatus as OrderStatus,
    };
    const result = await orderService.getMyOrders(req.user, inquery);
    console.log(inquery);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    try {
      console.log("getMyOrders");
    } catch (err) {
      console.log("Error, getMyOrders", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateOrder");
    const input: OrderUpdateInput = req.body;
    console.log("input:", input);
    const result = await orderService.updateOrder(req.user, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateOrder", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default orderController;
