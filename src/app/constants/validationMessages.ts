type TKeyMessage =
  | "fullName"
  | "email"
  | "phoneNumber"
  | "profileImg"
  | "address"
  | "password"
  | "status"
  | "wordNo"
  | "addBy"
  | "name"
  | "id";

interface IPaths {
  required: string;
  invalid: string;
  min?: string;
  max?: string;
}

export const validationMessage: Record<TKeyMessage, IPaths> = {
  fullName: {
    required: "Full Name Is Required!!",
    invalid: "Full Name Must be String!!",
  },
  email: {
    required: "Email Is Required!!!",
    invalid: "Email Should String!!!",
  },
  phoneNumber: {
    required: "Phone Is Required!!!",
    invalid: "Phone Should String!!!",
    min: "Minimum 11 Digit Required!!!",
    max: "Maximum 11 Digit Required!!!",
  },
  profileImg: {
    invalid: "Profile Image Should Be String!!!",
    required: "Profile Image is Required!!!",
  },
  address: {
    required: "Address Is Required!!!",
    invalid: "Address Should Be String !!!",
  },
  password: {
    required: "Password Is Required!!!",
    invalid: "Password Should Be String !!!",
    min: "Password Should Be Min 6 Char!!!",
  },
  status: {
    required: "Status Is Required!!!",
    invalid: "ACTIVE OR DELETED OR BLOCK IS VALID. Choose One From Here !!!",
  },
  name: {
    required: "Name Is Required!!",
    invalid: "Name Should Be String!!!",
  },
  wordNo: {
    required: "WordNo Is  Required!!!",
    invalid: "WordNo Should Be Number!!!",
  },
  addBy: {
    required: "AddBy Is  Required!!!",
    invalid: "AddBy Should Be String!!!",
  },
  id: {
    required: "ID Is Required!!!",
    invalid: "ID Is Required!!!",
  },
};
