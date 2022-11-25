import Dotenv from "dotenv-webpack";

export const plugins = [
  Dotenv({
    path: "./some.other.env", // default is .env
  }),
  new Dotenv.DefinePlugin({
    process: { env: {} },
  }),
];
