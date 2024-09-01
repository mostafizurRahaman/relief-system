import { Prisma } from "@prisma/client";
import { IErrorReturnType } from "../interfaces";
import httpStatus from "http-status";



const handlePcValidationError = (err: Prisma.PrismaClientValidationError): IErrorReturnType => {
   
  const message = err.message + " " + err?.name 

  return { 
    statusCode: httpStatus.BAD_REQUEST,
    message,
    errDetails: err
  }

}

export default handlePcValidationError;