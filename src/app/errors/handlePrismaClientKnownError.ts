import { Prisma } from "@prisma/client";
import { IErrorReturnType } from "../interfaces";
import httpStatus from "http-status";

const handlePrismaClientKnownRequestError = (
  err: Prisma.PrismaClientKnownRequestError
): IErrorReturnType => {

  const message = err.message + ` Code : --> ${err.code}`

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message,
    errDetails: err,
  };
};


export default handlePrismaClientKnownRequestError;