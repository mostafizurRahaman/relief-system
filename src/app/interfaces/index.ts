export interface IErrorIssue {
  field: string;
  message: string;
}
export interface IErrorDetails {
  issues: IErrorIssue[];
}

export interface IErrorReturnType {
  statusCode: number;
  message: string;
  errDetails: IErrorDetails | Error;
}

export interface ITokenPayload {
  phoneNumber: string;
  role: string;
}

export interface IPaginationOptions {
  limit?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}
