import { VerificationTypes } from "./EnumTypes";

export interface ICheckOtp {
  type: VerificationTypes;
  email: string;
  otp: string;
}


export interface JwtPayload {
    id: number,
    role: string
}