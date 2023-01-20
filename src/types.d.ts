export interface StockData {
  sku: string;
  stock: number;
}

export interface StockDataResult{
  sku: string;
  qty: number
}

export interface ResponseBody {
  res: StockDataResult;
  code: number;
}
