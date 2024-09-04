import { House } from "@prisma/client";
import prisma from "../../db";

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

export default createHouse;
