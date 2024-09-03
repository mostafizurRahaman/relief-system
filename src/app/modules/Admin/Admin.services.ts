import { Prisma } from "@prisma/client";
import prisma from "../../db";
import { IPaginationOptions } from "../../interfaces";

const getAllAdmin = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filters } = params;
  




  const whereConditions: Prisma.AdminWhereInput = {};
  const result = await prisma.admin.findMany({
    where: whereConditions,
  });

  return result;
};

export const AdminServices = {
  getAllAdmin,
};
