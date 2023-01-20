import { PltServer } from "./server";
require("dotenv").config();

const main = async () => {
  const pltServer = getPltServer();
  await pltServer.initialize(Number(process.env.PORT));
};

let pltServer: PltServer;
export const getPltServer = (): PltServer => {
  if (!pltServer) {
    pltServer = new PltServer();
  }
  return pltServer;
};

main().catch(console.error);
