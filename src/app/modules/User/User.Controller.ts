import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./User.Services";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.CreateAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin Created Successfully!!!`,
    data: result,
  });
});




export const UserController = {
  createAdmin,
};
