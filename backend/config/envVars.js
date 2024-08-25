import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_TOKEN: `${process.env.JWT_TOKEN}`,
  NODE_ENV: process.env.NODE_ENV,
};
