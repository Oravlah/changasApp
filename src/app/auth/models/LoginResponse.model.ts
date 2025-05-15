import { User } from "src/app/shared/models/User.model";

export interface LoginResponse {
  token: string;
  user: User;
}
