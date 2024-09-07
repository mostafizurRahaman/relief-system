import express from "express";
import { userRoutes } from "../modules/User/User.Route";
import { authRoutes } from "../modules/Auth/Auth.route";
import { adminRoutes } from "../modules/Admin/Admin.route";
import { houseRoutes } from "../modules/House/House.route";
import { reliefRoutes } from "../modules/Relief/Relief.router";

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/admins",
    route: adminRoutes,
  },
  {
    path: "/houses",
    route: houseRoutes,
  },
  {
    path: "/relief",
    route: reliefRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const allRoutes = router;
