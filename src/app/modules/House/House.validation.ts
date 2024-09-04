import { z } from "zod";
import { validationMessage } from "../../constants/validationMessages";

const { wordNo, name, addBy } = validationMessage;

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

export const HouseValidations = {
  createHouseValidation,
};
