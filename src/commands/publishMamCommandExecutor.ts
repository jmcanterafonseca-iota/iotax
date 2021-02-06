import { asciiToTrytes } from "@iota/converter";
import { composeAPI } from "@iota/core";
import { channelRoot, createChannel, createMessage, IMamChannelState, mamAttach, MamMode } from "@iota/mam.js";
import { Arguments } from "yargs";


import { getNetworkParams, providerName } from "./mamParams";

interface PublishParams {
  network: string;
  mwm: number;
  seed: string;
  mode: MamMode;
  sideKey?: string;
  startIndex?: number;
  message: string;
}


const mamExplorerLink: string = "https://explorer.iota.org";

const SECURITY_LEVEL = 2;
const DEPTH = 3;

// The publish to MAM Channel function
/**
 * @param args
 */
async function publish(args: PublishParams): Promise<{
  treeRoot: string;
  thisRoot: string;
  nextIndex: number;
}> {
  // Initialise IOTA API
  const api = composeAPI({ provider: args.network });

  // Go to the corresponding channel
  const channelState: IMamChannelState = createChannel(args.seed, SECURITY_LEVEL, args.mode, args.sideKey);

  const treeRoot = channelRoot(channelState);

  channelState.start = args.startIndex;
  const mamMessage = createMessage(channelState, asciiToTrytes(args.message));

  // And then attach the message, tagging it if required.
  // Attaching will return the actual transactions attached to the tangle if you need them.
  await mamAttach(api, mamMessage, DEPTH, args.mwm);

  return {
    treeRoot,
    thisRoot: mamMessage.root,
    nextIndex: channelState.start
  };
}


/**
 * @param root
 * @param params
 */
function formatExplorerURI(root: string, params: PublishParams): string {
  if (!params.sideKey) {
    return `${mamExplorerLink}/${providerName(params.network)}/streams/0/${root}/${params.mode}`;
  }
    return `${mamExplorerLink}/${providerName(params.network)}/streams/0/${root}/${params.mode}/${params.sideKey}`;
}

export default class PublishMamCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    try {
      const messageObj = JSON.parse(args.message as string);
      messageObj.timestamp = new Date().toISOString();
      const message = JSON.stringify(messageObj);

      const params: PublishParams = {
        ...getNetworkParams(args),
        seed: args.seed as string,
        mode: args.mode as MamMode,
        message,
        startIndex: args.index as number,
        sideKey: args.sidekey as string
      };

      const { treeRoot, thisRoot, nextIndex } = await publish(params);

      console.log({
        seed: params.seed,
        treeRoot: formatExplorerURI(treeRoot, params),
        thisRoot: formatExplorerURI(thisRoot, params),
        nextIndex
      });

      return true;
    } catch (error) {
      console.error("Error while publishing to MAM Channel:", error);
      return false;
    }
  }
}
