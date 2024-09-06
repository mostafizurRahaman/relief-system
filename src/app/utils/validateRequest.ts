import { AnyZodObject } from "zod";
import catchAsync from "./catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    const { success, data, error } = await schema.safeParseAsync({
      params: req.params,
      body: req.body,
      cookies: req.cookies,
    });

    if (!success) {
      next(error);
    }
    console.log(data)
    req.body = data?.body;
    req.cookies = data?.cookies;
    req.params = data?.params;
    next();
  });
};

export default validateRequest;
