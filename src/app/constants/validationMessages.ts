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
  | "id"
  | "reliefName"
  | "providerName"
  | "startDate"
  | "endDate"
  | "quantity_of_relief"
  | "number_of_recipients"

interface IPaths {
  required: string;
  invalid: string;
  min?: string;
  max?: string;
  isStartLessThenEndDate?: string;
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
  reliefName: {
    required: "Relief Name Is Required!!!",
    invalid: "Relief Name Should Be Invalid!!!",
  },
  providerName: {
    required: "Provider Name Is Required!!!",
    invalid: "Provider Name Should Be Invalid!!!",
  },
  startDate: {
    required: "startDate Is Required!!!",
    invalid: "startDate Should Date",
    isStartLessThenEndDate: "Start Date Should Be Less Then End Date!!!",
  },
  endDate: {
    required: "endDate Is Required!!!",
    invalid: "endDate Is Required!!!",
  },
  quantity_of_relief: {
    required: "Quantity Of Relief Should !!!",
    invalid: "Quantity Of ",
  },
  number_of_recipients: {
    required: "Quantity Of Relief Is Required!!!",
    invalid: "Quantity Of Relief Should ",
  },
};
