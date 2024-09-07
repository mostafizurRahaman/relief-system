import express from "express";
import { reliefController } from "./Relieft.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../utils/validateRequest";
import { ReliefValidations } from "./Relief.validations";

const router = express.Router();

router.post(
  "/create-relief",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(ReliefValidations.createReliefValidationSchema),
  reliefController.createRelief
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  reliefController.getAllRelief
);

router.put(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(ReliefValidations.updateReliefValidationSchema),
  reliefController.updateRelief
);

router.put(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(ReliefValidations.closeReliefValidationSchema),
  reliefController.closeReliefStatus
);

export const reliefRoutes = router;
