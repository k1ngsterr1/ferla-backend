import { UserPayload, UserResponse } from "@core/utils/User/types";

export interface IJWTService {
  generateAccessToken(user: UserResponse): string;
  generateRefreshToken(user: UserResponse): string;
  getAccessPayload(token: string): UserPayload;
  getRefreshPayload(token: string): UserPayload;
}
