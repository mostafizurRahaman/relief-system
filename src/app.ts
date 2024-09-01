import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import catchAsync from "./app/utils/catchAsync";
import sendResponse from "./app/utils/sendResponse";
import configs from "./app/configs";
import httpStatus from "http-status";
import { allRoutes } from "./app/routes";
import notFound from "./app/middlewares/notFound";

//  Application *
const app: Application = express();

//  Application Level Middleware **
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//  Root App Get Route(*)

app.get(
  "/",
  catchAsync(async (req, res) => {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: null,
      message: `Server Is Running On Port ${configs.port}`,
    });
  })
);


//  All Routes (**)
app.use('/api/v1', allRoutes)




//  Not Found Route ::
app.use(notFound)


// Global Error handler ** 
