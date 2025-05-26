import { Equipo } from "./Equipo.model";

export interface User{
  id: string;
  email: string;
  username: string;
  password: string;
  equipo: Equipo | null;
}
