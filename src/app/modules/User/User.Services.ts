//  Create Admin Route

import httpStatus from "http-status";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import { IAdmin } from "./User.Interface";

const CreateAdmin = async (payload: IAdmin) => {
  //  Destructure Data of Payload **
  const { password, admin } = payload;

  // Check Is User Exists With This Phone Number ( Because I want to  Validate User With Mobile number):
  const isExists = await prisma.user.findUnique({
    where: {
      phoneNumber:admin.phoneNumber
    }
  });

  if (isExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exists With This Phone Number")
  }


  //  Hash PlainText  of Password: 
  // const  hashPassword = 

  //  Payload Of For User ** 
  const userPayload = { 
    
  }




};

export const UserServices = {
  CreateAdmin,
};
