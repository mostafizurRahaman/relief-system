import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { jwtHelpers } from "../utils/jwtHelpers";
import configs from "../configs";
import { Secret } from "jsonwebtoken";
import prisma from "../db";
import { Request } from "express";
import { UserRole } from "@prisma/client";

const auth = (...roles: UserRole[]) => {
  return catchAsync(async (req: Request & { user?: any }, res, next) => {
    const token = req.headers.authorization;

    //  Check Is Token Exists Or Not : :
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are UnAuthorized!!!");
    }

    //  Verify token **
    const decoded = jwtHelpers.verifyToken(
      token,
      configs.access_token_secret as Secret
    );

    //  Check User Exists **
    const isUserExist = await prisma.user.findUniqueOrThrow({
      where: {
        phoneNumber: decoded.phoneNumber,
        role: decoded.role,
      },
    });

    if (!isUserExist) {
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden User !!!");
    }

    // Check User Role have Access This Route:
    if (!roles.includes(isUserExist.role)) {
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden User!!!");
    }

    // Set Decoded Value Into Request **

    req.user = decoded;

    next();
  });
};

export default auth;
