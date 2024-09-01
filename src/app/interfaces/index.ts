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
