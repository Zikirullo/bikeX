import { shapeIntoMongooseObjectId } from "../libs/config";
import { UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/errors";
import { Bike, BikeInput, BikeUpdateInput } from "../libs/types/bike";
import { User } from "../libs/types/user";
import bikeModel from "../schema/bike.model";
import userModel from "../schema/user.model";

class BikesService {
  private readonly bikeModel;
  private readonly UserModel;

  constructor() {
    this.bikeModel = bikeModel;
    this.UserModel = userModel;
  }

  public async getStore(): Promise<User> {
    const result = await this.UserModel.findOne({
      userType: UserType.ADMIN,
    })
      .lean()
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
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

  public async updateBike(id: string, input: BikeUpdateInput): Promise<Bike> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.bikeModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result)
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATED_FAILED);

    return result;
  }
}

export default BikesService;
