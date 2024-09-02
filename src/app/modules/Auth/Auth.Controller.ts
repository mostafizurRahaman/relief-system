import httpStatus from "http-status";
import configs from "../../configs";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./Auth.Services";

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, needsPasswordChange } =
    await authServices.login(req.body);

  //  Set Cookies Into Browser **
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: configs.node_env === "production",
    sameSite: false,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 365 Days To Milliseconds
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User Logged In Successfully!!!`,
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

export const authController = {
  login,
};
