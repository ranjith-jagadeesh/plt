import { ResponseBody } from "./types";
import stock from "./data/stock.json";
import transactions from "./data/transactions.json";
import { Request } from "express";

export const getStockInfoRoute = (req: Request): ResponseBody => {
  const sku = req.query.sku;
  if (!sku) throw new Error("Not a valid request");

  const result = getStockInfo(String(sku));

  const response: ResponseBody = {
    res: result,
    code: 201,
  };
  return response;
};

export const getStockInfo = (sku: string): { sku: string; qty: number } => {
  const stockData: { sku: string; stock: number } = stock.find(
    (element) => element.sku == String(sku)
  ) ?? { sku: String(sku), stock: 0 };

  transactions.forEach((element) => {
    if (element.sku == sku)
      stockData.stock += element.type == "order" ? -element.qty : element.qty;
  });

  return { sku: stockData.sku, qty: stockData.stock };
};
