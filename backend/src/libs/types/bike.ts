import { ObjectId, Types } from "mongoose";
import { BikeStatus, BikeType } from "../enums/bike.enum";

export interface Bike {
  _id: ObjectId;
  bikeBrandName: string;
  bikeName: string;
  bikeStatus: BikeStatus;
  bikeType: BikeType;
  bikeImage?: string;
  bikeLeftCount: string;
  bikePrice: string;
  bikeViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BikeInQuery {
  order: string;
  page: number;
  limit: number;
  bikeType?: BikeType;
  search?: string;
}

export interface BikeInput {
  bikeBrandName: string;
  bikeName: string;
  bikeStatus?: BikeStatus;
  bikeType: BikeType;
  bikeLeftCount: number;
  bikePrice: number;
  bikeImages: string[];
}

export interface BikeUpdateInput {
  bikeBrandName?: string;
  bikeName?: string;
  bikeStatus?: BikeStatus;
  bikeType?: BikeType;
  bikeImage?: string;
  bikeLeftCount?: number;
  bikePrice?: number;
}
