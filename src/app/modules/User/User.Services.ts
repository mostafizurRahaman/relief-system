import { Beneficiary } from "@prisma/client";
//  Create Admin Route

import httpStatus from "http-status";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import { IAdmin } from "./User.Interface";
import { passwordHelpers } from "../../utils/passwordHelpers";
import configs from "../../configs";
import { Beneficiary, UserRole } from "@prisma/client";
import { ITokenPayload } from "../../interfaces";

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

  return result;
};

interface IBeneficiary {
  password: string;
  beneficiary: Beneficiary;
}

const createBeneficiary = async (
  payload: IBeneficiary,
  admin: ITokenPayload
) => {
  const { password, beneficiary } = payload;
  //  Check Is Beneficiary Exists With Phone Number**
  const isExistWithPhoneNumber = await prisma.beneficiary.findUnique({
    where: {
      phoneNumber: beneficiary.phoneNumber,
    },
  });

  if (isExistWithPhoneNumber) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User Already Exists With This Phone Number!!!"
    );
  }

  //  Check Is Beneficiary Exists With NID Number **
  const isExistWithNidNumber = await prisma.beneficiary.findUnique({
    where: {
      nid: beneficiary.nid,
    },
  });

  if (isExistWithNidNumber) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User Already Exists With This NID!!!"
    );
  }

  //  Check Admin Is Exists *
  const isAdminExists = await prisma.admin.findUnique({
    where: {
      phoneNumber: admin.phoneNumber,
      isDeleted: false,
      user: {
        phoneNumber: admin.phoneNumber,
        status: "ACTIVE",
      },
    },
  });

  if (!isAdminExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Admin Doesn't Exists!!!");
  }

  //  Hash Password **
  const hashPassword = await passwordHelpers.hashPassword(
    password,
    Number(configs.bcrypt_solt_round as string)
  );

  const userPayload = {
    role: UserRole.BENIFICIARY,
    phoneNumber: beneficiary.phoneNumber,
    password: hashPassword,
  };

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userPayload,
    });

    const beneficiaryData = await tx.beneficiary.create({
      data: {
        ...beneficiary,
        createdBy: admin.phoneNumber,
      },
    });

    return beneficiaryData;
  });

  return result;
};

export const UserServices = {
  CreateAdmin,
};
