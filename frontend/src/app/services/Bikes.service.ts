import axios from "axios";
import { api } from "../../lib/config";
import type { Bike, BikeInQuery } from "../../lib/types/bike";

export default class BikesService {
  private readonly path: string;

  constructor() {
    this.path = api;
  }

  public async getBikes(input: BikeInQuery): Promise<Bike[]> {
    try {
      let url = `${this.path}/bikes/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.bikeType) url += `&bikeType=${input.bikeType}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log("getBikes", result);

      return result.data;
    } catch (err) {
      console.log("ERROR in getBikes", err);
      throw err;
    }
  }
}
