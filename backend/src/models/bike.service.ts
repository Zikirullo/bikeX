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

  public async getAllBikes(): Promise<Bike[]> {
    const result = await this.bikeModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.UPDATED_FAILED);
    return result;
  }
}

export default BikesService;
