import * as express from "express";
import { getStockInfoRoute } from "./stockInfo";
import { ResponseBody } from "./types";

export const router = express.Router();
type routerFunction = typeof getStockInfoRoute;

/**
 * Get Stock Information
 */
router.get(
  "/",
  async (req: express.Request, res: express.Response) =>
    await handleRoute(req, res, getStockInfoRoute)
);

/**
 * Handle all routes via this function
 * @param req
 * @param res
 * @param fn
 */
const handleRoute = async (
  req: express.Request,
  res: express.Response,
  fn: routerFunction
) => {
  try {
    const resBody = <ResponseBody>await fn(req);
    const resCode = resBody.code;
    res.status(resCode).send(resBody.res);
  } catch (err: any) {
    const error = err.message;
    try {
      const errMessage = JSON.parse(error);
      res.status(400).send({ message: errMessage });
    } catch (err) {
      res.status(400).send({ message: error });
    }
  }
};
