import { House, Prisma } from "@prisma/client";
import prisma from "../../db";
import { IPaginationOptions } from "../../interfaces";
import { paginationHelpers } from "../../utils/paginationHelpers";
import { HouseSearchAbleFields } from "./House.constant";

const createHouse = async (payload: House) => {
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

  if (searchTerm) {
    andConditions.push({
      OR: HouseSearchAbleFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

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

const updateHouse = async (id: string, payload: Partial<House>) => {
  await prisma.house.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.house.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteHouse = async (id: string) => {
  await prisma.house.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.house.delete({
    where: {
      id,
    },
  });

  return result;
};

export const HouseServices = {
  createHouse,
  getAllHouses,
  updateHouse,
  deleteHouse,
};
