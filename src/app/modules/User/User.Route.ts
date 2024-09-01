import express from "express";
import { UserController } from "./User.Controller";
import validateRequest from "../../utils/validateRequest";
import { userValidations } from "./User.Validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(userValidations.createAdminValidation),
  UserController.createAdmin
);

export const userRoutes = router;
