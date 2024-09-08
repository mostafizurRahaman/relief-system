import express from "express";
import { UserController } from "./User.Controller";
import validateRequest from "../../utils/validateRequest";
import { userValidations } from "./User.Validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userValidations.createAdminValidation),
  UserController.createAdmin
);

router.post(
  "/create-beneficiary",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userValidations.createBeneficiaryValidationSchema),
  UserController.createAdmin
);
export const userRoutes = router;
