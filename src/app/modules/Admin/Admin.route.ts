import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AdminController } from "./Admin.controller";

const router = express.Router();

router.get(
  "/get-all",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.getAllAdmin
);

export const adminRoutes = router;
