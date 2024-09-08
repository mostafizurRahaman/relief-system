import { UserRole } from "@prisma/client";
import prisma from ".";
import configs from "../configs";
import { passwordHelpers } from "../utils/passwordHelpers";

const seedSuperAdmin = async () => {
  const hashPassword = await passwordHelpers.hashPassword(
    "12345678",
    Number(configs.bcrypt_solt_round as string)
  );

  const isSuperAdminExists = await prisma.user.findFirst({
    where: {
      role: UserRole.SUPER_ADMIN,
    },
  });

  if (!isSuperAdminExists) {
    const result = await prisma.user.create({
      data: {
        phoneNumber: "01951976238",
        password: hashPassword,
        role: UserRole.SUPER_ADMIN,
      },
    });
    console.log(`Data Seed Successfully`, result);
  }
  console.log(`Data Seeded Already!!`);
};

export default seedSuperAdmin;
