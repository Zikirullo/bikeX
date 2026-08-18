import { shapeIntoMongooseObjectId } from "../libs/config";
import { OrderStatus } from "../libs/enums/order.enum";

import {
  Order,
  OrderInquery,
  OrderItem,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import orderModel from "../schema/order.model";

import { ObjectId } from "mongoose";

import UserService from "./user.service";
import { User } from "../libs/types/user";
import Errors, { HttpCode, Message } from "../libs/errors";
import orderItem from "../schema/orderItems.model";
import orderItemModel from "../schema/orderItems.model";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly UserService;

  constructor() {
    this.orderModel = orderModel;
    this.orderItemModel = orderItemModel;
    this.UserService = new UserService();
  }

  public async createOrder(
    user: User,
    input: OrderItemInput[],
  ): Promise<Order> {
    const userId = shapeIntoMongooseObjectId(user._id);

    const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;

    try {
      const newOrder: Order = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        userId: userId,
      });

      const orderId = newOrder._id;
      console.log("orderId", newOrder._id);
      await this.recordOrderItems(orderId, input);

      return newOrder;
    } catch (err) {
      console.log("ERROR, model:createOrder", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }

  private async recordOrderItems(
    orderId: ObjectId,
    input: OrderItemInput[],
  ): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      item.orderId = orderId;
      item.bikeId == shapeIntoMongooseObjectId(item.bikeId);
      await this.orderItemModel.create(item);
      return "Inserted";
    });

    console.log("PromisedList =>", promisedList);
    const orderItemState = await Promise.all(promisedList);
    console.log("orderItemList =>", orderItemState);
  }

  public async getMyOrders(
    user: User,
    inquery: OrderInquery,
  ): Promise<Order[]> {
    const userId = shapeIntoMongooseObjectId(user._id);

    const matches = { userId: userId, orderStatus: inquery.orderStatus };

    const result = this.orderModel
      .aggregate([
        { $match: matches },
        { $sort: { updatedAt: -1 } },
        { $skip: (inquery.page - 1) * inquery.limit },
        { $limit: inquery.limit },
        {
          $lookup: {
            from: "orderItem",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "Bikes",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "bikeData",
          },
        },
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }
  // --updateOrder
  public async updateOrder(
    user: User,
    input: OrderUpdateInput,
  ): Promise<Order> {
    const userId = shapeIntoMongooseObjectId(user._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus;

    const result = await this.orderModel
      .findOneAndUpdate(
        {
          userId: userId,
          _id: orderId,
        },
        { orderStatus: orderStatus },
        { new: true },
      )
      .exec();

    if (!result)
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATED_FAILED);

    if (orderStatus === OrderStatus.PROCESSING) {
      await this.UserService.addUserPoints(user, +1);
    }

    return result;
  }
}

export default OrderService;
