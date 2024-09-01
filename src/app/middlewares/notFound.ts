import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

const notFound = catchAsync(async (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `Api Route Not Found`,
    errDetails: {
      route: req.path,
      origin: req.originalUrl
    }
  });
});

export default notFound;