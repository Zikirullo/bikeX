import { User } from "../libs/types/user";
import jwt from "jsonwebtoken";
import { AUTH_TIMER } from "../libs/config";

class AuthService {
  private readonly secretToken;

  constructor() {
    this.secretToken = process.env.SECRET_TOKEN as string;
  }

  public async createToken(payload: User) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;
      jwt.sign(
        payload,
        process.env.SECRET_TOKEN as string,
        {
          expiresIn: duration,
        },
        (err, token) => {
          if (err) {
            console.log("JWT ERROR:", err);
            reject(err);
          } else {
            resolve(token as string);
          }
        },
      );
    });
  }

  public async verifyAuth(token: string): Promise<User> {
    const result: User = (await jwt.verify(token, this.secretToken)) as User;
    console.log(`--- [AUTH] userNick: ${result.userNick} ---`);
    return result;
  }
}

export default AuthService;
