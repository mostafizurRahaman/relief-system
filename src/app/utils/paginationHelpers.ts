import {
  ICalculatePaginationReturnType,
  IPaginationOptions,
} from "../interfaces";

const calculatePaginate = (
  options: IPaginationOptions
): ICalculatePaginationReturnType => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options?.sortOrder === "asc" ? "asc": "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePaginate,
};
