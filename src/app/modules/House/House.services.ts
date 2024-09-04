import { House, Prisma } from "@prisma/client";
import prisma from "../../db";
import { IPaginationOptions } from "../../interfaces";
import { paginationHelpers } from "../../utils/paginationHelpers";

const createHouse = async (payload: House) => {
  //  Check Is This User Exists **
  await prisma.admin.findUniqueOrThrow({
    where: {
      phoneNumber: payload?.addBy,
      isDeleted: false,
      user: {
        status: "ACTIVE",
      },
    },
  });

  //  Then Create A House **
  const house = await prisma.house.create({
    data: payload,
  });

  return house;
};

const getAllHouses = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filters } = params;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginate(options);
  const andConditions: Prisma.HouseWhereInput[] = [];

  const whereConditions: Prisma.HouseWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.house.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.house.count({
    where: whereConditions,
  });

  const meta = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };

  return {
    meta,
    data: result,
  };
};

export const HouseServices = {
  createHouse,
  getAllHouses,
};
