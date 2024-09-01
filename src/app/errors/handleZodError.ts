import { ZodError, ZodIssue } from "zod";
import { IErrorReturnType } from "../interfaces";
import httpStatus from "http-status";

const handleZodError = (err: ZodError): IErrorReturnType => {
  //  Format Error Message  For All Fields **
  const message = err?.issues.reduce((fullMessage: string, issue: ZodIssue) => {
    fullMessage =
      fullMessage +
      (fullMessage.length ? ". " : "") +
      (issue?.path[issue?.path?.length - 1] as string).toUpperCase() +
      " --> " +
      issue?.message;

    return fullMessage;
  }, "");

  //  Format Array of Issues Here **
  const issues = err?.issues.map((field) => ({
    field: field.path[field.path.length - 1] as string,
    message: field.message,
  }));

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message,
    errDetails: {
      issues,
    },
  };
};

export default handleZodError;
