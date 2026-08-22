import type { BikeStatus, BikeType } from "../enum/bikes.enum";

export interface Bike {
  _id: string;
  bikeBrandName: string;
  bikeName: string;
  bikeStatus: BikeStatus;
  bikeType: BikeType;
  bikeImages?: string;
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
