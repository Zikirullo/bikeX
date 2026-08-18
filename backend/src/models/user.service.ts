import { shapeIntoMongooseObjectId } from "../libs/config";
import { UserStatus, UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/errors";
import {
  LoginInput,
  User,
  UserInput,
  UserUpdateInput,
} from "../libs/types/user";
import userModel from "../schema/user.model";
import * as bcrypt from "bcryptjs";

class UserService {
  private readonly UserModel;

  constructor() {
    this.UserModel = userModel;
  }
  // Admin
  public async processSignup(input: UserInput): Promise<User> {
    const exist = await this.UserModel.findOne({
      userType: UserType.ADMIN,
    }).exec();
    console.log("exist", exist);

    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);

    const salt = await bcrypt.genSalt();
    input.userPassword = await bcrypt.hash(input.userPassword, salt);

    try {
      console.log("INPUT BEFORE CREATE:", input);
      const result = await this.UserModel.create(input);
      result.userPassword = "";
      return result.toJSON();
    } catch (err) {
      console.log(err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<User> {
    const user = await this.UserModel.findOne(
      { userNick: input.userNick },
      { userNick: 1, userPassword: 1 },
    ).exec();
    if (!user)
      throw new Errors(HttpCode.NOT_FOUND, Message.USER_NICK_NOT_FOUND);
    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    const result = await this.UserModel.findById(user._id).exec();
    return result.toJSON();
  }

  // User

  public async signup(input: UserInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    input.userPassword = await bcrypt.hash(input.userPassword, salt);

    try {
      const result = await this.UserModel.create(input);
      result.userPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("ERROR, model:sighup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE_OR_EMAIL);
    }
  }

  public async login(input: LoginInput): Promise<User> {
    const user = await this.UserModel.findOne(
      {
        userNick: input.userNick,
        userStatus: { $ne: UserStatus.DELETED },
      },
      { userNick: 1, userPassword: 1, userStatus: 1 },
    ).exec();
    if (!user)
      throw new Errors(HttpCode.NOT_FOUND, Message.USER_NICK_NOT_FOUND);
    else if (user.userStatus === UserStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }
    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.UserModel.findById(user._id).lean().exec();
  }

  public async getUsers(): Promise<User[]> {
    const result = await this.UserModel.find({
      userType: UserType.USER,
    }).exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateUser(input: UserUpdateInput): Promise<User> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.UserModel.findByIdAndUpdate(
      {
        _id: input._id,
      },
      input,
      { new: true },
    ).exec();

    if (!result)
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATED_FAILED);

    return result;
  }

  public async getUserDetail(user: User): Promise<User> {
    const userId = shapeIntoMongooseObjectId(user._id);
    const result = await this.UserModel.findOne({
      _id: userId,
      userStatus: UserStatus.ACTIVE,
    }).exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async update(user: User, input: UserUpdateInput): Promise<User> {
    const UserId = shapeIntoMongooseObjectId(user._id);
    const result = await this.UserModel.findOneAndUpdate(
      { _id: UserId },
      input,
      { new: true },
    ).exec();
    if (!result)
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATED_FAILED);
    return result;
  }
}
export default UserService;
