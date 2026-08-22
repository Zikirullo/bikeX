import { shapeIntoMongooseObjectId } from "../libs/config";
import { BikeStatus } from "../libs/enums/bike.enum";
import { UserType } from "../libs/enums/user.enum";
import { ViewGroup } from "../libs/enums/view.enum";
import Errors, { HttpCode, Message } from "../libs/errors";
import {
  Bike,
  BikeInput,
  BikeInQuery,
  BikeUpdateInput,
} from "../libs/types/bike";
import { T } from "../libs/types/common";
import { User } from "../libs/types/user";
import { ViewInput } from "../libs/types/view";
import bikeModel from "../schema/bike.model";
import userModel from "../schema/user.model";
import ViewService from "./view.service";
import { ObjectId } from "mongoose";

class BikesService {
  private readonly bikeModel;
  private readonly UserModel;
  public viewService: ViewService;

  constructor() {
    this.bikeModel = bikeModel;
    this.UserModel = userModel;
    this.viewService = new ViewService();
  }

  public async getBikes(inquery: BikeInQuery): Promise<Bike[]> {
    const match: T = {
      bikeStatus: BikeStatus.ACTIVE,
    };

    // Bike type filter
    if (inquery.bikeType) {
      match.bikeType = inquery.bikeType;
    }

    // Search by name, brand, or type
    if (inquery.search) {
      const regex = new RegExp(inquery.search, "i");

      match.$or = [
        { bikeName: regex },
        { bikeBrandName: regex },
        { bikeType: regex },
      ];
    }

    // Sorting
    let sort: T;

    switch (inquery.order) {
      case "bikePriceAsc":
        sort = { bikePrice: 1 };
        break;

      case "bikePriceDesc":
        sort = { bikePrice: -1 };
        break;

      case "bikeViews":
        sort = { bikeViews: -1 };
        break;

      case "createdAt":
      default:
        sort = { createdAt: -1 };
        break;
    }

    const result = await this.bikeModel
      .aggregate([
        { $match: match },

        { $sort: sort },

        {
          $skip: (inquery.page - 1) * inquery.limit,
        },

        {
          $limit: inquery.limit,
        },
      ])
      .exec();

    if (!result) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }

    return result;
  }

  public async getBike(userId: ObjectId | null, id: string): Promise<Bike> {
    const bikeId = shapeIntoMongooseObjectId(id);
    let result = await this.bikeModel
      .findOne({
        _id: bikeId,
        bikeStatus: BikeStatus.ACTIVE,
      })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    if (userId) {
      //Check View log existence

      const input: ViewInput = {
        userId,
        viewRefId: bikeId,
        viewGroup: ViewGroup.BIKE,
      };
      const existView = await this.viewService.checkViewExistence(input);

      console.log("exist:", !!existView);
      if (!existView) {
        //insert new view log
        console.log("PLANNING TO INSERT NEW VIEW");
        await this.viewService.insertMemberView(input);

        //increase counts

        result = await this.bikeModel
          .findByIdAndUpdate(bikeId, { $inc: { bikeViews: 1 } }, { new: true })
          .exec();
      }
    }

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
      console.log("Error createNewBike:", err);
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
