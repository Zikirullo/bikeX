import { UserType } from "../libs/enums/user.enum";
import Errors, { HttpCode, Message } from "../libs/errors";
import { LoginInput, User, UserInput } from "../libs/types/user";
import userModel from "../schema/user.model";
import * as bcrypt from "bcryptjs";

class UserService {
  private readonly UserModel;

  constructor() {
    this.UserModel = userModel;
  }

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
}
export default UserService;
