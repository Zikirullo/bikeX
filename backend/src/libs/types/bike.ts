import { BikeStatus, BikeType } from "../enums/bike.enum";

export interface BikeInput {
  bikeBrandName: string;
  bikeName: string;
  bikeStatus?: BikeStatus;
  bikeType: BikeType;
  bikeImage?: string;
  bikeLeftCount: number;
  bikePrice: number;
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
