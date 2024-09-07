import { Prisma, Relief } from "@prisma/client";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../interfaces";
import { paginationHelpers } from "../../utils/paginationHelpers";
import { reliefSearchAbleFields } from "./Relief.constant";

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
  const { searchTerm, startDate, endDate, quantity_of_relief, ...filters } =
    params;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginate(options);

  const andConditions: Prisma.ReliefWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: reliefSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (filters && Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map((field) => ({
        [field]: {
          equals: filters[field],
        },
      })),
    });
  }
  if (quantity_of_relief) {
    andConditions.push({
      quantity_of_relief: {
        equals: Number(quantity_of_relief),
      },
    });
  }

  if (startDate) {
    andConditions.push({
      startDate: {
        gte: new Date(startDate),
      },
    });
  }
  if (endDate) {
    andConditions.push({
      endDate: {
        lte: new Date(endDate),
      },
    });
  }

  const whereConditions: Prisma.ReliefWhereInput = {
    AND: andConditions,
  };
  console.dir(whereConditions, { depth: Infinity });
  const result = await prisma.relief.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.relief.count({
    where: whereConditions,
  });
  const meta = {
    limit,
    page,
    total,
    totalPages: Math.ceil(total / limit),
  };
  return {
    meta,
    data: result,
  };
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
