import axios from "axios";
import { api } from "../../lib/config";
import type {
  Order,
  OrderInquery,
  OrderItemInput,
  OrderUpdateInput,
} from "../../lib/types/order";

export default class OrderService {
  private readonly path: string;

  constructor() {
    this.path = api;
  }

  public async createOrder(input: OrderItemInput[]): Promise<Order> {
    try {
      const url = this.path + "/order/create";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("createOrder:", result);

      return result.data;
    } catch (err) {
      console.log("ERROR in createOrder:", err);
      throw err;
    }
  }

  public async getMyOrders(input: OrderInquery): Promise<Order[]> {
    try {
      const url = `${this.path}/order/all`;
      const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
      const result = await axios.get(url + query, { withCredentials: true });
      console.log("getMyOrders =>", result);

      return result.data;
    } catch (err) {
      console.log("ERROR in getMyOrders:", err);
      throw err;
    }
  }

  public async updateOrder(input: OrderUpdateInput): Promise<Order[]> {
    try {
      const url = this.path + "/order/update";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("updateOrder =>", result);

      return result.data;
    } catch (err) {
      console.log("ERROR in updateOrder:", err);
      throw err;
    }
  }
}
