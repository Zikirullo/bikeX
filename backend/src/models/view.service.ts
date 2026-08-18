import Errors, { HttpCode, Message } from "../libs/errors";
import { View, ViewInput } from "../libs/types/view";
import viewModel from "../schema/view.model";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = viewModel;
  }
  public async checkViewExistence(input: ViewInput): Promise<View> {
    return await this.viewModel
      .findOne({ userId: input.userId, viewRefId: input.viewRefId })
      .exec();
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      return await this.viewModel.create(input);
    } catch (err) {
      console.log("ERROR, model:insertMemberView:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }
}

export default ViewService;
