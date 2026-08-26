import axios from "axios";
import { api } from "../../lib/config";
import type {
  LoginInput,
  User,
  UserInput,
  UserUpdateInput,
} from "../../lib/types/user";

export default class UserService {
  private readonly path: string;

  constructor() {
    this.path = api;
  }

  public async signup(input: UserInput): Promise<User> {
    try {
      const url = this.path + "/user/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("User data =>", result);

      const user: User = result.data.user;
      console.log("user =>", user);

      localStorage.setItem("userdata", JSON.stringify(user));

      return user;
    } catch (err) {
      console.log("ERROR in signup", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<User> {
    try {
      const url = this.path + "/user/login";
      const result = await axios.post(url, input, { withCredentials: true });

      const user: User = result.data.user;

      localStorage.setItem("userdata", JSON.stringify(user));

      return user;
    } catch (err) {
      console.log("ERROR in login", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = this.path + "/user/logout";
      await axios.post(url, {}, { withCredentials: true });

      localStorage.removeItem("userdata");
    } catch (err) {
      console.log("ERROR in logout", err);
      throw err;
    }
  }

  public async getUserDetail(): Promise<User> {
    try {
      const url = this.path + "/user/detail";
      const result = await axios.get(url, { withCredentials: true });

      const user: User = result.data;
      localStorage.setItem("userdata", JSON.stringify(user));

      return user;
    } catch (err) {
      console.log("ERROR in getUserDetail", err);
      throw err;
    }
  }

  // imageFile is a real File from an <input type="file">, kept separate
  // from UserUpdateInput.userImage (which stays the stored string path)
  // since the backend's multer route needs an actual file, not a path.
  public async update(input: UserUpdateInput, imageFile?: File): Promise<User> {
    try {
      const formData = new FormData();
      formData.append("userNick", input.userNick || "");
      formData.append("userPhone", input.userPhone || "");
      if (input.userPassword) {
        formData.append("userPassword", input.userPassword);
      }
      if (imageFile) {
        formData.append("userImage", imageFile);
      }

      const result = await axios.post(`${this.path}/user/update`, formData, {
        withCredentials: true,
      });

      // Extract user object safely (res.status().json(result) maps directly to result.data)
      const user: User = result.data?.user || result.data?.data || result.data;

      if (!user || typeof user !== "object") {
        throw new Error("Invalid user response from server update.");
      }

      localStorage.setItem("userdata", JSON.stringify(user));

      return user;
    } catch (err) {
      console.log("ERROR in update", err);
      throw err;
    }
  }

  public async getTopUsers(): Promise<User[]> {
    try {
      const url = this.path + "/user/top-users";
      const result = await axios.get(url);

      return result.data;
    } catch (err) {
      console.log("ERROR in getTopUsers", err);
      throw err;
    }
  }
}
