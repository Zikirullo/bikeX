import mongoose, { Schema } from "mongoose";
import { UserAuth, UserStatus, UserType } from "../libs/enums/user.enum";

const userSchema = new Schema(
  {
    userType: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.USER,
      required: true,
    },

    userStatus: {
      type: String,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
      required: true,
    },

    userAuth: {
      type: String,
      enum: UserAuth,
      default: UserAuth.PHONE,
      required: true,
    },

    userPhone: {
      type: String,
      sparse: true,
    },

    userNick: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    userPassword: {
      type: String,
      required: true,
      select: false,
    },

    userPoints: {
      type: Number,
      default: 0,
      required: true,
    },

    userImage: {
      type: String,
    },

    userDesc: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  },
);

export default mongoose.model("User", userSchema);
