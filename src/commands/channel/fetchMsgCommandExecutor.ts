/* eslint-disable no-duplicate-imports */
import { Address, Subscriber, SendOptions } from "wasm-node/iota_streams_wasm";
import { Arguments } from "yargs";
import { isDefined } from "../../globalParams";
import { getNetworkParams } from "../commonParams";
import { ChannelHelper } from "./channelHelper";

export default class FetchMsgCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    const node = getNetworkParams(args).network;

    let seed = "";
    if (!isDefined(args, "seed")) {
      seed = ChannelHelper.generateSeed();
    } else {
      seed = args.seed as string;
    }

    try {
      const options = new SendOptions(node, true);
      const subs = new Subscriber(seed, options.clone());

      // Channel contains the channel address + the announce messageID
      const channel = args.channel as string;
      const announceLink = Address.from_string(channel);

      await subs.clone().receive_announcement(announceLink);

      // Iteratively retrieve messages until the end
      let finish = false;
      while (!finish) {
        const messages = await subs.clone().fetch_next_msgs();
        if (!messages || messages.length === 0) {
          finish = true;
        }

        // In our case only one message is expected

        const message = Buffer.from(messages[0].get_message().get_public_payload()).toString();
        console.log(message);
      }
    } catch {
      return false;
    }

    return true;
  }
}
