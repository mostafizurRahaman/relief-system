import { AnyZodObject } from "zod";
import catchAsync from "./catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    const { success, data, error } = await schema.safeParseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    if (!success) {
      next(error);
    }

    req.body = data?.body;
    req.cookies = data?.cookies;
    next();
  });
};

export default validateRequest;
