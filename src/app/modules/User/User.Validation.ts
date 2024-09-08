import { z } from "zod";
import { validationMessage } from "../../constants/validationMessages";

const {
  email,
  fullName,
  address,
  password,
  phoneNumber,
  profileImg,
  fatherName,
  husbandName,
  nid,
} = validationMessage;

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

const createBeneficiaryValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: password.required,
      invalid_type_error: password.invalid,
    }),
    beneficiary: z
      .object({
        fullName: z.string({
          required_error: fullName.required,
          invalid_type_error: fullName.invalid,
        }),
        profileImg: z
          .string({
            invalid_type_error: profileImg.invalid,
          })
          .url("Profile Image Should Be URL!!!")
          .optional(),
        email: z
          .string({
            required_error: email.required,
            invalid_type_error: email.invalid,
          })
          .email("Invalid Email"),
        phoneNumber: z.string({
          required_error: phoneNumber.required,
          invalid_type_error: phoneNumber.invalid,
        }),
        nid: z.string({
          required_error: nid.required,
          invalid_type_error: nid.invalid,
        }),
        fatherName: z
          .string({
            invalid_type_error: fatherName.invalid,
          })
          .optional(),
        husbandName: z.string({
          invalid_type_error: husbandName.invalid,
        }),
        house_id: z
          .string({
            invalid_type_error: "House Should Be String!!!",
            required_error: "House Is Required!!!",
          })
          .uuid("Invalid ID"),
        isDeleted: z
          .boolean({
            invalid_type_error: "isDeleted Should Be Boolean",
          })
          .default(false)
          .optional(),
      })
      .refine(
        (data) => {
          if (!data.fatherName && !data.husbandName) {
            return false;
          }
          return data?.fatherName || data?.husbandName;
        },
        {
          message: "Father OR Husband Name  Is Required!!",
          path: ["body", "beneficiary", "fatherName"],
        }
      )
      .refine(
        (data) => {
          if (!data.nid) {
            return false;
          }

          if (data?.nid?.length === 10 || data?.nid.length === 14) {
            return true;
          }

          return false;
        },
        {
          message: `Provide A valid Nid Number`,
          path: ["body", "beneficiary", "nid"],
        }
      ),
  }),
});

export const userValidations = {
  createAdminValidation,
  createBeneficiaryValidationSchema,
};
