import { IPaginationOptions } from "./../../interfaces/index";
import { reliefServices } from "./Relief.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import pick from "../../utils/pick";
import { paginationOptions } from "../../constants";
import { reliefFilterAbleFields } from "./Relief.constant";

const createRelief = catchAsync(async (req, res) => {
  const result = await reliefServices.createRelief(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Relief Is Created Successfully!!!",
    data: result,
  });
});

const getAllRelief = catchAsync(async (req, res) => {
  const params = pick(req.query, reliefFilterAbleFields);
  const options = pick(req.query, paginationOptions);

  const result = await reliefServices.getAllRelief(params, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Relief Retrieved Successfully!!!",
    data: result,
  });
});

const updateRelief = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reliefServices.updateRelief(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Relief Is Updated Successfully!!!",
    data: result,
  });
});

const closeReliefStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reliefServices.closeReliefStatus(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Relief Is Updated Successfully!!!",
    data: result,
  });
});

export const reliefController = {
  createRelief,
  updateRelief,
  getAllRelief,
  closeReliefStatus,
};
