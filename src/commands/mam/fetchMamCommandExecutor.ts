import { trytesToAscii } from "@iota/converter";
import { API, composeAPI } from "@iota/core";
import { channelRoot, createChannel, IMamChannelState, mamFetchAll, mamFetchCombined, MamMode } from "@iota/mam.js";
import { Arguments } from "yargs";


const INTERVAL: number = 5000;
const CHUNK_SIZE: number = 10;

const SECURITY_LEVEL: number = 2;

interface MamChannel {
  root: string;
  mode: MamMode;
  sideKey?: string;
}

interface RetrievalParams {
  seed?: string;
  root?: string;
  mode: MamMode;
  sideKey?: string;
  from?: number;
  maxChunkSize?: number;
  limit?: number;
  watch?: boolean;
}

type MamFetchParameters = RetrievalParams & {
  network: string;
  partitions: number;
  combined: boolean;
};

/**
 * Fetches from a MAM Channel
 *
 * @param args MAM Fetch Parameters
 * @returns boolean indicating whether the operation succeeded or not
 *
 */
async function fetchMamChannel(args: MamFetchParameters): Promise<boolean> {
  try {
    // Initialise IOTA API
    const api: API = composeAPI({ provider: args.network });

    // mamFetchCombined
    if (args.partitions > 1 && args.combined) {
      await retrievePartitionedCombined(args, api);
    } else if (args.partitions > 1) {
      // Partition channels Promise.all
      await retrievePartitioned(args, api);
    } else {
      // Retrieve "iteratively"
      await retrieve(args, api);
    }
    return true;
  } catch (error) {
    console.error("Error while fetching MAM Channel:", error);
    return false;
  }
}

/**
 * Calculates the start root
 * from can be different than 0 and in that case a seed has to be provided
 *
 * @param args Retrieval Params
 *
 * @returns the start root
 */
function startRoot(args: RetrievalParams): string {
  if (args.from === 0 && args.root) {
    return args.root;
  }
  const channelState: IMamChannelState = createChannel(
    args.seed, SECURITY_LEVEL, args.mode, args.sideKey
  );
  channelState.start = args.from;

  return channelRoot(channelState);
}

/**
 * Partitions a MAM Channel with the size specified
 *
 * @param args MAM Fetch Parameters
 * @param partitionSize Partition size
 *
 * @returns MAM Channels resulting from the partitioning
 *
 */
function createPartitions(args: MamFetchParameters, partitionSize: number): MamChannel[] {
  const partitions: MamChannel[] = [];

  let current = args.from;
  while (current < args.limit) {
    const channelState: IMamChannelState = createChannel(args.seed, SECURITY_LEVEL, args.mode, args.sideKey);

    channelState.start = current;

    const channelDetails: MamChannel = {
      root: channelRoot(channelState),
      mode: args.mode,
      sideKey: args.sideKey
    };
    partitions.push(channelDetails);

    current += partitionSize;
  }

  return partitions;
}

/**
 * Retrieves in partitioned mode using mamFetchCombined
 *
 * @param args MAM Fetch Parameters
 * @param api  IOTA API
 *
 * @returns void
 *
 */
async function retrievePartitionedCombined(args: MamFetchParameters, api: API): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let partitionSize = Math.floor(args.limit / args.partitions);

    if (partitionSize === 0) {
      partitionSize = args.limit;
    }

    if (typeof args.from === "undefined") {
      args.from = 0;
    }

    const channels = createPartitions(args, partitionSize);

    let total = 0;

    const retrievalFunction = async () => {
      try {
        const fetched = await mamFetchCombined(api, channels);

        for (let k = 0; k < fetched.length; k++) {
          console.log(JSON.parse(trytesToAscii(fetched[k].message)));
          channels[k].root = fetched[k].nextRoot;
        }

        if (fetched.length > 0) {
          total += fetched.length;
          if (total < args.limit) {
            setImmediate(retrievalFunction);
          }
        } else {
          resolve();
        }
      } catch (error) {
        console.error("Error while fetching MAM Channel:", error);
        reject(error);
      }
    };

    setImmediate(retrievalFunction);
  });
}

/**
 * Retrieves from MAM Channel
 * limit is ignored if watch is on
 *
 * @param args Retrieval arguments
 * @param api  IOTA API
 *
 * @returns void
 *
 */
async function retrieve(args: RetrievalParams, api: API): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let currentRoot = startRoot(args);

    let total = 0;

    let executing = false;

    const retrievalFunction = async () => {
      if (executing) {
        return;
      }

      executing = true;

      const chunkSize = Math.min(args.maxChunkSize, args.limit - total);

      try {
        const fetched = await mamFetchAll(
          api,
          currentRoot,
          args.mode,
          args.sideKey,
          chunkSize
        );

        fetched.forEach(result => {
          console.log(JSON.parse(trytesToAscii(result.message)));
        });

        if (fetched.length > 0) {
          currentRoot = fetched[fetched.length - 1].nextRoot;

          total += fetched.length;
          if (total < args.limit) {
            setImmediate(retrievalFunction);
          }
        } else if (args.watch) {
          setInterval(retrievalFunction, INTERVAL);
          resolve();
        } else {
          resolve();
        }
        // console.log('Current Root', currentRoot);
      } catch (error) {
        console.error("Error while fetching MAM Channel:", error);
        reject(error);
      } finally {
        executing = false;
      }
    };

    setImmediate(retrievalFunction);
  }); // end of promise
}

/**
 * Retrieves data in partitioned mode
 *
 * @param args Fetch parameters
 * @param api  IOTA API
 *
 * @returns void
 */
async function retrievePartitioned(args: MamFetchParameters, api: API): Promise<void> {
  let partitionSize = Math.floor(args.limit / args.partitions);

  if (partitionSize === 0) {
    partitionSize = args.limit;
  }

  if (typeof args.from === "undefined") {
    args.from = 0;
  }

  const channels: MamChannel[] = createPartitions(args, partitionSize);

  const promises = [];
  for (let k = 0; k < channels.length - 1; k++) {
    promises.push(
      retrieve({
        from: 0,
        root: channels[k].root,
        sideKey: args.sideKey,
        limit: partitionSize,
        mode: args.mode
      }, api)
    );
  }

  const lastLimit = args.limit - ((channels.length - 1) * partitionSize);

  // Last channel we retrieve all
  promises.push(
    retrieve({
      from: 0,
      root: channels[channels.length - 1].root,
      sideKey: args.sideKey,
      limit: lastLimit,
      mode: args.mode
    }, api)
  );

  await Promise.all(promises);
}

export default class FetchMamCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    let network: string = args.net as string;

    if (args.devnet) {
      network = "https://nodes.devnet.iota.org";
    }

    if (args.comnet) {
      network = "https://nodes.comnet.thetangle.org";
    }

    const mode: MamMode = args.mode as MamMode;
    const root = args.root as string;
    const from = (args.from || 0) as number;
    const sideKey = args.sidekey as string;

    const watchParam = args.watch;
    let watch: boolean;

    if (typeof watchParam === "undefined") {
      watch = false;
    } else {
      watch = args.watch as boolean;
    }

    const limit = (args.limit || Infinity) as number;

    const seed = args.seed as string;
    const maxChunkSize = (args.chunksize || CHUNK_SIZE) as number;

    let partitions: number = 1;
    if (typeof args.partitions !== "undefined") {
      partitions = args.partitions as number;
    }
    const combined: boolean = args.combined as boolean;

    const params: MamFetchParameters = {
      network, mode,
      root, from, sideKey,
      watch, limit, seed, maxChunkSize,
      partitions, combined
    };

    return fetchMamChannel(params);
  }
}