import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as helmet from "helmet";
import { router } from "./routes";

/**
 * Intialize Express server
 */
export class PltServer {
  server: ExpressServer;
  async initialize(port: number) {
    this.server = new ExpressServer();
    this.server.listen(port);
  }
}

/**
 * Create a Express Server
 */
export class ExpressServer {
  public app;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet.frameguard({ action: "sameorigin" }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());

    /**
     * Hide express server in response header
     */
    this.app.disable("x-powered-by");

    /**
     * Log every request in standardised format
     */
    this.app.use(
      morgan((tokens: any, req: express.Request, res: express.Response) => {
        return [
          "IN",
          "INFO",
          tokens.date(req, res, "iso"),
          tokens["remote-addr"](req, res),
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          `${tokens["response-time"](req, res)}ms`,
          reqBody(req, res),
          process.env.PD_DEPLOY_ID || "-",
          sourceIp(req),
        ].join(" ");
      })
    );
      
    this.app.use("/", router);
  }
  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  }
}

const reqBody = (req: express.Request, res: express.Response): string => {
  return req.body ? JSON.stringify(req.body) : "-";
};

/**
 * Get IP address for logging
 * @param req
 * @returns
 */
const sourceIp = (req: express.Request): string => {
  if (req.ip) return req.ip;
  const apiGatewayEventEncoded = req.header("x-apigateway-event");
  if (!apiGatewayEventEncoded) return "-";
  const apiGatewayEventString = decodeURIComponent(apiGatewayEventEncoded);
  try {
    const apiGatewayEvent = JSON.parse(apiGatewayEventString);
    return apiGatewayEvent?.requestContext?.identity?.sourceIp;
  } catch (err) {
    return "-";
  }
};
