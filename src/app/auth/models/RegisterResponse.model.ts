import { User } from "src/app/shared/models/User.model";

export interface RegisterResponse {
  token: string;
  user: User;
}
