import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./User.Services";
import { Request } from "express";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.CreateAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin Created Successfully!!!`,
    data: result,
  });
});

//  Create Beneficiary ***
const createBeneficiary = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const admin = req.user;
    const result = await UserServices.createBeneficiary(req.body, admin);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Beneficiary Created Successfully!!!`,
      data: result,
    });
  }
);

export const UserController = {
  createAdmin,
  createBeneficiary,
};
