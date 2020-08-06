import { Arguments } from "yargs";
import ICommandParam from "../ICommandParam";

const COMNET_URL = "https://nodes.comnet.thetangle.org";
const DEVNET_URL = "https://nodes.devnet.iota.org";

const DEFAULT_MWM: number = 9;
const COMNET_MWM: number = 10;

const providers = Object.create(null);
providers[DEVNET_URL] = "devnet";
providers[COMNET_URL] = "comnet";

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

export function getNetworkParams(args: Arguments): { network: string, mwm: number } {
  let network: string;
  let mwm: number = DEFAULT_MWM;

  if (args.net) {
    network = args.net as string;
  }

  if (args.devnet) {
    network = DEVNET_URL;
  }

  if (args.comnet) {
    network = COMNET_URL;
    mwm = COMNET_MWM;
  }

  return { network, mwm };
}
