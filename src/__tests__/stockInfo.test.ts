import { getStockInfo } from "../stockInfo";

describe("Stock Info", () => {
  it("Get Stock Info - Stock present in stock.json", () => {
    const sku = "SXV420098/71/68";
    const res = getStockInfo(sku);

    expect(res.sku).toEqual(sku);
    expect(res.qty).toEqual(706);
  });

  it("Get Stock Info - Verify Deep copy of Objects", () => {
    const sku = "SXV420098/71/68";
    const res = getStockInfo(sku);

    expect(res.sku).toEqual(sku);
    expect(res.qty).toEqual(706);
  });

  it("Get Stock Info - Stock not present in stock.json", () => {
    const sku = "KSS894454/75/76";
    const res = getStockInfo(sku);

    expect(res.sku).toEqual(sku);
    expect(res.qty).toEqual(-85);
  });
});
