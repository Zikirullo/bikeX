import Errors, { HttpCode, Message } from "../libs/errors";
import { Bike, BikeInput } from "../libs/types/bike";
import bikeModel from "../schema/bike.model";

class BikesService {
  private readonly bikeModel;

  constructor() {
    this.bikeModel = bikeModel;
  }

  public async createNewBike(input: BikeInput): Promise<Bike> {
    try {
      return await this.bikeModel.create(input);
    } catch (err) {
      console.log("Error createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }
}

export default BikesService;
