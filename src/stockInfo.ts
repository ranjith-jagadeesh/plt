import { ResponseBody, StockData, StockDataResult } from "./types";
import stock from "./data/stock.json";
import transactions from "./data/transactions.json";
import { Request } from "express";

export const getStockInfoRoute = (req: Request): ResponseBody => {
  const sku = req.query.sku;
  if (!sku)
    throw new Error("Invalid Request, Enter SKU to get stock information");

  const result = getStockInfo(String(sku));

  const response: ResponseBody = {
    res: result,
    code: 200,
  };
  return response;
};

/**
 * Get Stock Information for the SKU
 */
export const getStockInfo = (sku: string): StockDataResult => {
  /**
   * If SKU is not found in stock.json file, initialize empty stock
   */
  const stockData: StockData = {
    ...(stock.find((element) => element.sku == String(sku)) ?? { //Deep copy
      sku: String(sku),
      stock: 0,
    }),
  };

  let istxnFound = false;
  /**
   * Calculate stock against transactios
   */
  transactions.forEach((element) => {
    if (element.sku == sku) {
      istxnFound = true;
      /**
       * If type is order subtract the quantity, else add
       */
      stockData.stock += element.type == "order" ? -element.qty : element.qty;
    }
  });

  /**
   * If SKU is not present in both stock and transaction, throw a error
   */
  if (!istxnFound && !stockData.stock)
    throw new Error("Invalid Request, Enter a valid SKU");

  return <StockDataResult>{ sku: stockData.sku, qty: stockData.stock };
};
