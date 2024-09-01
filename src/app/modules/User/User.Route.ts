import express from "express";
import { UserController } from "./User.Controller";

const router = express.Router();

router.post("/create-admin", UserController.createAdmin);


export const userRoutes = router; 
