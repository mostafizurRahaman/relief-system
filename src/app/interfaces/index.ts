import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import configs from "../configs";
//  Create An Express App *
const app: Application = express();

//  Application label Middlewares Will Comes here **
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//  General Routes Will Comes Here **
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `Server Is Running Now On Port ${configs?.port}`,
  });
});

//  Not Found Route Will Comes Here **

//  Global Error Handler Will Comes Here **

export default app;
