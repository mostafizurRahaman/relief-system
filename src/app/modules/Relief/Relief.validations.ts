import { z } from "zod";
import { validationMessage } from "../../constants/validationMessages";

const {
  reliefName,
  providerName,
  startDate,
  endDate,
  quantity_of_relief,
  number_of_recipients,
  id,
} = validationMessage;

const createReliefValidationSchema = z.object({
  body: z
    .object({
      reliefName: z.string({
        required_error: reliefName.required,
        invalid_type_error: reliefName.invalid,
      }),
      providerName: z.string({
        required_error: providerName.required,
        invalid_type_error: reliefName.invalid,
      }),
      startDate: z
        .string({
          required_error: startDate.required,
          invalid_type_error: startDate.invalid,
        })
        .date(startDate.invalid),
      endDate: z
        .string({
          required_error: endDate.required,
          invalid_type_error: endDate.invalid,
        })
        .date(startDate.invalid),
      quantity_of_relief: z.number({
        required_error: quantity_of_relief.required,
        invalid_type_error: quantity_of_relief.invalid,
      }),
    })
    .refine(
      (data) => {
        const startDate = new Date(data.startDate).getTime();
        const endDate = new Date(data.endDate).getTime();
        if (endDate - startDate < 0) {
          return false;
        }
        return true;
      },
      {
        message: startDate.isStartLessThenEndDate,
      }
    ),
});

const updateReliefValidationSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: id.required,
      invalid_type_error: id.invalid,
    }),
  }),
  body: z.object({
    reliefName: z
      .string({
        required_error: reliefName.required,
        invalid_type_error: reliefName.invalid,
      })
      .optional(),
    providerName: z
      .string({
        required_error: providerName.required,
        invalid_type_error: reliefName.invalid,
      })
      .optional(),
  }),
});

const closeReliefValidationSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: id.required,
      invalid_type_error: id.invalid,
    }),
  }),
});

export const ReliefValidations = {
  createReliefValidationSchema,
  updateReliefValidationSchema,
  closeReliefValidationSchema,
};
