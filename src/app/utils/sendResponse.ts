import { Response } from "express";

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

interface IResponseType<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: IMeta;
  data: T | null | undefined;
}

const sendResponse = <T>(res: Response, data: IResponseType<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
