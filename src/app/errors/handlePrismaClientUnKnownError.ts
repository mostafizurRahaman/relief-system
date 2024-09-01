import { Prisma } from "@prisma/client";
import { IErrorReturnType } from "../interfaces";
import httpStatus from "http-status";

const handlePrismaClientUnKnownError = (
  err: Prisma.PrismaClientUnknownRequestError
): IErrorReturnType => {
  const message = `${err.name} => ${err.message}`;
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message,
    errDetails: err,
  };
};
export default handlePrismaClientUnKnownError;