import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { AdminFilterAbleFields } from "./Admin.constant";
import { AdminServices } from "./Admin.services";
import { paginationOptions } from "../../constants";

const getAllAdmin = catchAsync(async (req, res) => {
  const params = pick(req.query, AdminFilterAbleFields);
  const options = pick(req.query, paginationOptions);

  const result = await AdminServices.getAllAdmin(params, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admins Retrieved Successfully!!!`,
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
};



