import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ITokenPayload } from "../interfaces";

const createToken = (
  payload: ITokenPayload,
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  const decoded = jwt.verify(token, secret) as JwtPayload;

  return decoded;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
