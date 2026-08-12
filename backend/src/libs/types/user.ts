import { ObjectId } from "mongoose";
import { UserAuth, UserStatus, UserType } from "../enums/user.enum";

export interface User {
  _id: ObjectId;
  userType: UserType;
  UserStatus: UserStatus;
  userAuth: UserAuth;
  userPhone: string;
  userNick: string;
  userPassword?: string;
  userPoints?: string;
  userImage?: string;
  userDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  userType?: UserType;
  userStatus?: UserStatus;
  userAuth: UserAuth;
  userPhone: string;
  userNick: string;
  userPassword: string;
  userPoints?: number;
  userImage?: string;
  userDesc?: string;
}

export interface UserUpdateInput {
  userNick?: string;
  userPassword?: string;
  userPhone?: string;
  userImage?: string;
  userDesc?: string;
}

export interface LoginInput {
  userNick: string;
  userPassword: string;
}
