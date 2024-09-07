import { Relief } from "@prisma/client";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createRelief = async (payload: Relief) => {
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  if (startDate.getTime() > endDate.getTime()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Start Date Should Be Less Then End Date!!!`
    );
  }

  //  Create Keywords ****
  const result = await prisma.relief.create({
    data: {
      ...payload,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
    },
  });

  return result;
};

export const reliefServices = {
  createRelief,
};
