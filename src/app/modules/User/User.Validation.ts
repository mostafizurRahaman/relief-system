import { z } from "zod";
import { validationMessage } from "../../constants/validationMessages";

const { email, fullName, address, password, phoneNumber, profileImg, status } =
  validationMessage;

const createAdminValidation = z.object({
  body: z.object({
    password: z.string({
      required_error: password.required,
      invalid_type_error: password.invalid,
    }),
    admin: z.object({
      fullName: z.string({
        required_error: fullName.required,
        invalid_type_error: fullName.invalid,
      }),
      phoneNumber: z
        .string({
          required_error: phoneNumber.required,
          invalid_type_error: phoneNumber.invalid,
        })
        .min(11, { message: phoneNumber.min }),
      profileImg: z
        .string({
          invalid_type_error: profileImg.invalid,
        })
        .url("Invalid URL")
        .optional(),
      email: z
        .string({
          required_error: email.required,
          invalid_type_error: email.invalid,
        })
        .email("Invalid Email"),
      address: z.string({
        required_error: address.required,
        invalid_type_error: address.invalid,
      }),
    }),
  }),
});

export const userValidations = {
  createAdminValidation,
};
