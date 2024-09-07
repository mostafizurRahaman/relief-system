import { reliefServices } from "./Relief.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createRelief = catchAsync(async (req, res) => {
  const result = await reliefServices.createRelief(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Relief Is Created Successfully!!!",
    data: result,
  });
});

export const reliefController = {
  createRelief,
};
