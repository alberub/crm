import { User } from "./User.interface";

export interface UserResponse{
    ok: boolean;
    token: string;
    usuario: User
}