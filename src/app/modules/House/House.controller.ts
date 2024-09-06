import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HouseServices } from "./House.services";
import { HouseFilterAbleFields } from "./House.constant";
import pick from "../../utils/pick";
import { paginationOptions } from "../../constants";
import { Request } from "express";

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

const getAllHouses = catchAsync(
  async (req: Request & { user?: any }, res, next) => {
    const user = req.user;
    const params = pick(req.query, HouseFilterAbleFields);
    const options = pick(req.query, paginationOptions);
    //  House services **
    const result = await HouseServices.getAllHouses(params, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Houses Retrieved Successfully!!! `,
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateHouse = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await HouseServices.updateHouse(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `House Updated Successfully!!!`,
    data: result,
  });
});

export const HouseController = {
  CreateHouse,
  getAllHouses,
  updateHouse,
};
