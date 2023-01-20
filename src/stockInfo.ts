import { ResponseBody, StockData, StockDataResult } from "./types";
import stock from "./data/stock.json";
import transactions from "./data/transactions.json";
import { Request } from "express";

export const getStockInfoRoute = (req: Request): ResponseBody => {
  const sku = req.query.sku;
  if (!sku) throw new Error("Enter SKU to get stock information");

  const result = getStockInfo(String(sku));

  const response: ResponseBody = {
    res: result,
    code: 201,
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
  const stockData: StockData = stock.find(
    (element) => element.sku == String(sku)
  ) ?? { sku: String(sku), stock: 0 };

  /**
   * Calculate stock against transactios
   */
  transactions.forEach((element) => {
    if (element.sku == sku)
      stockData.stock += element.type == "order" ? -element.qty : element.qty;
  });

  return <StockDataResult>{ sku: stockData.sku, qty: stockData.stock };
};
