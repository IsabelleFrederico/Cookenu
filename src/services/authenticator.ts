import * as jwt from "jsonwebtoken";
import { config } from "dotenv"
import { authenticationData } from "../types/user";

config()

export const generateToken = (payload: authenticationData): string => {

   return jwt.sign(
      payload,
      process.env.JWT_KEY!,
      {
         expiresIn: "12h"
      });
}

export const getTokenData = (token: string): authenticationData => {

   const result: authenticationData = jwt.verify(
      token,
      process.env.JWT_KEY!
   ) as authenticationData;

   return result;
}