import { shapeIntoMongooseObjectId } from "../libs/config";
import { BikeStatus } from "../libs/enums/bike.enum";
import { UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/errors";
import {
  Bike,
  BikeInput,
  BikeInQuery,
  BikeUpdateInput,
} from "../libs/types/bike";
import { T } from "../libs/types/common";
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

  public async getBikes(inquery: BikeInQuery): Promise<Bike[]> {
    const match: T = { bikeStatus: BikeStatus.ACTIVE };
    if (inquery.bikeType) match.biketype = inquery.bikeType;
    if (inquery.search) {
      match.productName = { $regex: new RegExp(inquery.search, "i") };
    }
    const sort: T =
      inquery.order === "bikePrice"
        ? { [inquery.order]: 1 }
        : { [inquery.order]: -1 };
    const result = await this.bikeModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquery.page * 1 - 1) * inquery.limit },
        { $limit: inquery.limit * 1 },
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
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
