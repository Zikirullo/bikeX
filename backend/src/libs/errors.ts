export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong!",
  NO_DATA_FOUND = "No data found!",
  CREATED_FAILED = "Creation failed!",
  UPDATED_FAILED = "Update failed!",
  DELETED_FAILED = "Deletion failed!",
  USER_NOT_FOUND = "User not found!",
  USER_NICK_NOT_FOUND = "No user with that nickname!",
  USER_PHONE_NOT_FOUND = "No user with that phone number!",
  USED_NICK = "This nickname is already in use!",
  USED_PHONE = "This phone number is already in use!",
  USED_EMAIL = "This email is already in use!",
  WRONG_PASSWORD = "Wrong password, please try again!",
  NOT_AUTHENTICATED = "You're not authenticated. Please login first!",
  BLOCKED_USER = "Your account has been blocked. Please contact support!",
  TOKEN_CREATION_FAILED = "Token creation failed!",
  INVALID_TOKEN = "Invalid or expired token!",
  BIKE_NOT_FOUND = "Bike not found!",
  BIKE_NOT_AVAILABLE = "Bike is not available!",
  BIKE_ALREADY_SOLD = "Bike has already been sold!",
  BIKE_ALREADY_DELETED = "Bike has already been deleted!",
  INVALID_BIKE_STATUS = "Invalid bike status!",
  INVALID_BIKE_TYPE = "Invalid bike type!",
}

class Errors extends Error {
  public code: HttpCode;
  public message: Message;

  static standard = {
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: Message.SOMETHING_WENT_WRONG,
  };

  constructor(statusCode: HttpCode, statusMessage: Message) {
    super(statusMessage);

    this.code = statusCode;
    this.message = statusMessage;

    Object.setPrototypeOf(this, Errors.prototype);
  }
}

export default Errors;
