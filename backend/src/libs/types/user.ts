import { UserAuth, UserStatus, UserType } from "../enums/user.enum";

export interface UserInput {
  userType?: UserType;
  userStatus?: UserStatus;
  userAuth: UserAuth;

  userPhone?: string;
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
