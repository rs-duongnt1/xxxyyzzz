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
      const validation = {
        projectId: "asdioasdoiasodiasdasd",
        validations: [
          {
            name: "Register",
            type: "string",
            required: true,
            groupRules: [
              {
                rules: ["isBoolean", "isUnique"],
                customMessage: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              },
            ],
          },
        ],
      };
      let data = JSON.stringify(validation, null);
      const JSON_ROOT_PATH = path.join(
        getConfig().serverRuntimeConfig.PROJECT_ROOT,
        "json"
      );
      fs.writeFileSync(path.join(JSON_ROOT_PATH, "validation.json"), data);
      res.status(200).json("Update success!");
    } else {
      throw new ErrorHandler("method not allowed", 400);
    }
  }
);