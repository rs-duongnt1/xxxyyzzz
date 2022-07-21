// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import getConfig from "next/config";
import fs from "fs";
import readline from "readline";
import { ErrorHandler } from "pages/server/utils/error-handler";
import CatchGlobal from "pages/server/utils/catch-global";

export default CatchGlobal(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      const JSON_ROOT_PATH = path.join(
        getConfig().serverRuntimeConfig.PROJECT_ROOT,
        "json"
      );

      const currentValidations = JSON.parse(
        fs.readFileSync(path.join(JSON_ROOT_PATH, "validation.json"), "utf-8")
      );

      const validationIndex = currentValidations.findIndex(
        (validation: any) => validation.id === req.body.id
      );

      currentValidations[validationIndex] = req.body;

      fs.writeFileSync(
        path.join(JSON_ROOT_PATH, "validation.json"),
        JSON.stringify(currentValidations, null, 2)
      );
      res.status(200).json(validationIndex);
    } else {
      throw new ErrorHandler("method not allowed", 400);
    }
  }
);
