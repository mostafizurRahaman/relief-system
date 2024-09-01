//  Create Admin Route

import httpStatus from "http-status";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import { IAdmin } from "./User.Interface";
import { passwordHelpers } from "../../utils/passwordHelpers";
import configs from "../../configs";
import { UserRole } from "@prisma/client";

const CreateAdmin = async (payload: IAdmin) => {
  //  Destructure Data of Payload **
  const { password, admin } = payload;

  // Check Is User Exists With This Phone Number ( Because I want to  Validate User With Mobile number):
  const isExists = await prisma.user.findUnique({
    where: {
      phoneNumber: admin.phoneNumber,
    },
  });

  if (isExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User Already Exists With This Phone Number"
    );
  }

  //  Hash PlainText  of Password:
  const hashPassword = await passwordHelpers.hashPassword(
    password,
    Number(configs.bcrypt_solt_round as string)
  );

  //  Payload Of For User **
  const userPayload = {
    phoneNumber: admin.phoneNumber,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    //  User Payload**
    const user = await tx.user.create({
      data: userPayload,
    });

    //  Admin Payload **
    const adminData = await tx.admin.create({
      data: {
        fullName: admin.fullName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        address: admin.address,
      },
    });

    return {
      user,
      adminData,
    };
  });

  return result
};

export const UserServices = {
  CreateAdmin,
};
