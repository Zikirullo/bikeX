import type { UserAuth, UserStatus, UserType } from "../enum/user.enum";

export interface User {
  _id: string;
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
  _id: string;
  userStatus?: UserStatus;
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
