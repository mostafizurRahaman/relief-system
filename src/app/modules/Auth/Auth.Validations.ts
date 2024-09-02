import { z } from "zod";
import { validationMessage } from "../../constants/validationMessages";

const { phoneNumber, password } = validationMessage;

const loginValidationSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: phoneNumber.required,
      invalid_type_error: phoneNumber.required,
    }),
    password: z.string({
      required_error: password.required,
      invalid_type_error: password.invalid,
    }),
  }),
});

export const authValidations = {
  loginValidationSchema,
};
