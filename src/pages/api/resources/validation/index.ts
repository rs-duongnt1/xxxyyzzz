// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import getConfig from "next/config";
import fs from "fs";
import { ErrorHandler } from "pages/server/utils/error-handler";
import CatchGlobal from "pages/server/utils/catch-global";

export default CatchGlobal(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      const JSON_ROOT_PATH = path.join(
        getConfig().serverRuntimeConfig.PROJECT_ROOT,
        "json"
      );
      const data = fs.readFileSync(
        path.join(JSON_ROOT_PATH, "validation.json"),
        "utf-8"
      );
      res.status(200).json(JSON.parse(data));
    } else {
      throw new ErrorHandler("method not allowed", 400);
    }
  }
);
