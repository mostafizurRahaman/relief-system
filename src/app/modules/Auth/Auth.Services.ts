import httpStatus from "http-status";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { ILoginCredential } from "./Auth.interface";

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


  if(!isCorrectPassword){
     throw new AppError(httpStatus.BAD_REQUEST, "You Credential Not Matched!!!")
  }


  //  Generate Access Token **

  


  //  Generate Refresh Token ** 




};
