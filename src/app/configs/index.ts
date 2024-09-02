import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), '.env')
});


export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  reset_token_secret: process.env.RESET_TOKEN_SECRET,
  access_token_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refresh_token_expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  reset_token_expiresIn: process.env.RESET_TOKEN_EXPIRES_IN,
};
