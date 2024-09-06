import { z } from "zod";
import { validationMessage } from "../../constants/validationMessages";

const { wordNo, name, addBy, id } = validationMessage;

const createHouseValidation = z.object({
  body: z.object({
    wordNo: z.number({
      required_error: wordNo.required,
      invalid_type_error: wordNo.invalid,
    }),
    name: z.string({
      required_error: name.required,
      invalid_type_error: name.invalid,
    }),
    addBy: z.string({
      required_error: addBy.required,
      invalid_type_error: addBy.invalid,
    }),
  }),
});

const updateHouseValidationSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: id.required,
        invalid_type_error: id.invalid,
      })
      .uuid({
        message: "Invalid ID!!!",
      }),
  }),
  body: z.object({
    wordNo: z
      .number({
        required_error: wordNo.required,
        invalid_type_error: wordNo.invalid,
      })
      .optional(),
    name: z
      .string({
        required_error: name.required,
        invalid_type_error: name.invalid,
      })
      .optional(),
  }),
});

export const HouseValidations = {
  createHouseValidation,
  updateHouseValidationSchema,
};
