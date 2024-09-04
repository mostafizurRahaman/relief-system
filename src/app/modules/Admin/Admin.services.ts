import { paginationHelpers } from "./../../utils/paginationHelpers";
import { Prisma } from "@prisma/client";
import prisma from "../../db";
import { IPaginationOptions } from "../../interfaces";
import { AdminSearchableFields } from "./Admin.constant";

const getAllAdmin = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filters } = params;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePaginate(options);

  const andConditions: Prisma.AdminWhereInput[] = [
    {
      isDeleted: false,
    },
  ];

  //  Search Implementation **
  if (searchTerm) {
    andConditions.push({
      OR: AdminSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //  FiltrableFields
  if (filters && Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.keys(filters).map((field) => ({
        [field]: {
          equals: filters[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };
  console.dir(whereConditions, { depth: Infinity });
  const result = await prisma.admin.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.admin.count({
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





export const AdminServices = {
  getAllAdmin,
};
