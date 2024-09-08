import { Beneficiary, UserRole } from "@prisma/client";
import prisma from "../../db";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { ITokenPayload } from "../../interfaces";

