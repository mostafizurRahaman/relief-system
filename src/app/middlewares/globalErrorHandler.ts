import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import handleZodError from "../errors/handleZodError";
import configs from "../configs";
import { Prisma } from "@prisma/client";
import handlePrismaClientKnownRequestError from "../errors/handlePrismaClientKnownError";
import handlePrismaClientUnKnownError from "../errors/handlePrismaClientUnKnownError";
import handlePCInitializationError from "../errors/handlePCInitializationError";
import AppError from "../errors/AppError";
import { IErrorDetails } from "../interfaces";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message: string = err.message || "Something Went Wrong";
  let errDetails: IErrorDetails | Error = err;
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;

  if (err instanceof ZodError) {
    const simplifiedErr = handleZodError(err);

    //  Set Values
    message = simplifiedErr.message;
    errDetails = simplifiedErr.errDetails;
    statusCode = simplifiedErr.statusCode;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedErr = handlePrismaClientKnownRequestError(err);

    //  Set Values
    message = simplifiedErr.message;
    errDetails = simplifiedErr.errDetails;
    statusCode = simplifiedErr.statusCode;
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    const simplifiedErr = handlePCInitializationError(err);
    console.dir({ err }, { depth: Infinity });

    //  Set Values
    message = simplifiedErr.message;
    errDetails = simplifiedErr.errDetails;
    statusCode = simplifiedErr.statusCode;
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    const simplifiedErr = handlePrismaClientUnKnownError(err);

    //  Set Values
    message = simplifiedErr.message;
    errDetails = simplifiedErr.errDetails;
    statusCode = simplifiedErr.statusCode;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    const simplifiedErr = handlePrismaClientUnKnownError(err);

    //  Set Values
    message = simplifiedErr.message;
    errDetails = simplifiedErr.errDetails;
    statusCode = simplifiedErr.statusCode;
  } else if (err instanceof AppError) {
    message = err.message;
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    message,
    success: false,
    errDetails: errDetails || err,
    stack: configs.node_env === "production" ? null : err.stack,
  });
};

export default globalErrorHandler;
