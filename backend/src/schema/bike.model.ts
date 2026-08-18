import mongoose, { Schema } from "mongoose";
import { BikeStatus, BikeType } from "../libs/enums/bike.enum";

const bikeSchema = new Schema(
  {
    bikeBrandName: {
      type: String,
      required: true,
      trim: true,
    },

    bikeName: {
      type: String,
      required: true,
      trim: true,
    },

    bikeStatus: {
      type: String,
      enum: Object.values(BikeStatus),
      default: BikeStatus.UNLISTED,
      required: true,
    },

    bikeType: {
      type: String,
      enum: Object.values(BikeType),
      required: true,
    },

    bikeImages: {
      type: [String],
    },

    bikeLeftCount: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },

    bikePrice: {
      type: Number,
      min: 0,
      required: true,
    },
    bikeViews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "Bikes",
  },
);

export default mongoose.model("Bike", bikeSchema);
