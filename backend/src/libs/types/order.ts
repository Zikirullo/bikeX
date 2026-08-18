import { ObjectId } from "mongoose";
import { OrderStatus } from "../enums/order.enum";
import { Bike } from "./bike";

export interface Order {
  _id: ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  orderItems: OrderItem[];
  bikeData: Bike[];
}

export interface OrderItem {
  _id: ObjectId;
  itemQuantity: number;
  itemPrice: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: ObjectId;
  bikeId: ObjectId;
}

export interface OrderItemInput {
  itemPrice: number;
  itemQuantity: number;
  bikeId: ObjectId;
  orderId?: ObjectId;
}

export interface OrderInquery {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: ObjectId;
  orderStatus: OrderStatus;
}
