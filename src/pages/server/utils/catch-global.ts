import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorHandler } from "./error-handler";
import cors from "cors";

export default function CatchGlobal(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    // );

    // res.setHeader("Allow", "PUT");

    return handler(req, res).catch((error: ErrorHandler) => {
      console.error(error);
      return res.status(error.statusCode || 500).json({
        message: error.message || error,
        statusCode: error.statusCode,
      });
    });
  };
}
