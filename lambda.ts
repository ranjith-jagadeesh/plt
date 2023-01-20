import * as awsServerlessExpress from "aws-serverless-express";
import { getPltServer } from "./src/index";

let inited = false;
let server: any = null;

async function init() {
  if (inited) return;
  const pltServer = getPltServer();
  await pltServer.initialize(0);
  server = awsServerlessExpress.createServer(pltServer.server.app);
  inited = true;
}

export const handler = async (event: any, context: any) => {
  // context.callbackWaitsForEmptyEventLoop = false;
  try {
    await init();
    const result = awsServerlessExpress.proxy(
      server,
      event,
      context,
      "PROMISE"
    );
    if (result && result.promise) {
      const response = await result.promise;
      return response;
    } else {
      throw new Error("awsServerlessExpress.proxy() failed");
    }
  } catch (err) {
      console.log("Error:", err);
      return {
          statusCode: 400,
          message: "Server Error"
      }
  }
};
