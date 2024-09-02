import express from "express";
import validateRequest from "../../utils/validateRequest";
import { authValidations } from "./Auth.Validations";

import { authController } from "./Auth.Controller";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authController.login
);

export const authRoutes = router;
