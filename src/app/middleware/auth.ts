import { NextFunction, Request, Response } from "express";
import catchAsyn from "../../utils/catchAsyn";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken"
import config from "../config";

const auth = () => {
  return catchAsyn(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not logged in");
    }

    const decoded =  jwt.verify(token, config.jwt_token_secret as string);

    


  });
};
