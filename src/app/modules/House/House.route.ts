import express from "express";
import validateRequest from "../../utils/validateRequest";
import { HouseController } from "./House.controller";
import { HouseValidations } from "./House.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-house",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(HouseValidations.createHouseValidation),
  HouseController.CreateHouse
);

router.get(
  "/get-all",
  auth(UserRole.ADMIN, UserRole.BENIFICIARY, UserRole.SUPER_ADMIN),
  HouseController.getAllHouses
);

export const houseRoutes = router;
