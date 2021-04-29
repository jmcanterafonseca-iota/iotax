import { Arguments } from "yargs";
import ICommandParam from "../ICommandParam";

const COMNET_URL = "https://nodes.comnet.thetangle.org";
const TESTNET_URL = "https://api.hornet-0.testnet.chrysalis2.com";
const MAINNET_URL = "https://chrysalis-nodes.iota.org";

const DEFAULT_MWM: number = 9;
const COMNET_MWM: number = 10;
const MAINNET_MWM: number = 14;

const providers: { [key: string]: string } = Object.create(null);

providers[TESTNET_URL] = "testnet";
providers[COMNET_URL] = "comnet";
providers[MAINNET_URL] = "mainnet";

/**
 * Returns the network provider name
 *
 * @param network Network endpoint
 *
 * @returns provider name
 */
export function providerName(network: string): string {
  return providers[network];
}

export const seedParam: ICommandParam = {
  name: "seed",
  options: {
    alias: "s",
    type: "string",
    description: "MAM Channel's seed",
    global: false
  }
};

/**
 * Obtains the network params
 *
 * @param args the arguments passed
 *
 * @returns the params
 */
export function getNetworkParams(args: Arguments): { network: string; mwm: number } {
  let network: string;
  let mwm: number = DEFAULT_MWM;

  if (args.net) {
    network = args.net as string;
  }

  if (args.testnet) {
    network = TESTNET_URL;
  }

  if (args.comnet) {
    network = COMNET_URL;
    mwm = COMNET_MWM;
  }

  if (args.mainnet) {
    network = MAINNET_URL;
    mwm = MAINNET_MWM;
  }

  return { network, mwm };
}
