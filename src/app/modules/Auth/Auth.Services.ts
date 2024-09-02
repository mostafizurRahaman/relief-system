import httpStatus from "http-status";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { ILoginCredential } from "./Auth.interface";
import { jwtHelpers } from "../../utils/jwtHelpers";
import configs from "../../configs";

const login = async (payload: ILoginCredential) => {
  const { phoneNumber, password } = payload;

  //  Check Is User Exists With This Phone Number  Or Not **
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      phoneNumber,
      status: "ACTIVE",
    },
  });

  //  Compare hash password **
  const isCorrectPassword = await passwordHelpers.comparePassword(
    password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "You Credential Not Matched!!!");
  }

  //  Payload For Token:
  const userPayload = {
    phoneNumber,
    role: user.role,
  };

  //  Generate Access Token **

  const accessToken = jwtHelpers.createToken(
    userPayload,
    configs.access_token_secret as string,
    configs.access_token_expiresIn as string
  );

  //  Generate Refresh Token **
  const refreshToken = jwtHelpers.createToken(
    userPayload,
    configs.refresh_token_secret as string,
    configs.refresh_token_expiresIn as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const authServices = {
  login,
};
