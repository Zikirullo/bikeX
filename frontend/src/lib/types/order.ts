import type { OrderStatus } from "../enum/order.enum";
import type { Bike } from "./bike";

export interface Order {
  _id: string;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  userId: Object;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  orderItems: OrderItem[];
  bikeData: Bike[];
}

export interface OrderItem {
  _id: string;
  itemQuantity: number;
  itemPrice: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
  bikeId: string;
}

export interface OrderItemInput {
  itemPrice: number;
  itemQuantity: number;
  bikeId: string;
  orderId?: string;
}

export interface OrderInquery {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}
