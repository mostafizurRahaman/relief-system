import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HouseServices } from "./House.services";

const CreateHouse = catchAsync(async (req, res, next) => {
  //  House services **
  const result = await HouseServices.createHouse(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `House Created Successfully!!! `,
    data: result,
  });
});

export const HouseController = {
  CreateHouse,
};
