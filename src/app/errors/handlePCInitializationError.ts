import { Prisma } from "@prisma/client";
import httpStatus from "http-status";




const handlePCInitializationError = (err: Prisma.PrismaClientInitializationError) => {
   
  const message = err.message.split('failed against')[1]
   console.log(message)
  return {
    statusCode: httpStatus.OK,
    message, 
    errDetails: err
  }

}

export default handlePCInitializationError;