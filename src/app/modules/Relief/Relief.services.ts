import { Relief } from "@prisma/client";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../interfaces";

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

const getAllRelief = async (params: any, options: IPaginationOptions) => {
  const result = await prisma.relief.findMany({
    where: {},
  });

  return result;
};

const updateRelief = async (id: string, payload: Partial<Relief>) => {
  //  Check Is Relief Exists Or Not :
  await prisma.relief.findUniqueOrThrow({
    where: {
      id,
      status: "RUNNING",
    },
  });

  //  Update the Relief :
  const result = await prisma.relief.update({
    where: {
      id,
      status: "RUNNING",
    },
    data: payload,
  });

  return result;
};
export const reliefServices = {
  createRelief,
  updateRelief,
  getAllRelief,
};
