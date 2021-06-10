/* eslint-disable no-duplicate-imports */
import * as crypto from "crypto";
import { Author, ChannelType, SendOptions } from "wasm-node/iota_streams_wasm";
import { Arguments } from "yargs";
import { getNetworkParams } from "../commonParams";

export default class AnchorMsgCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    try {
      const node = getNetworkParams(args).network;

      const options = new SendOptions(node, true);
      const seed = generateSeed();

      const auth = new Author(seed, options.clone(), ChannelType.SingleBranch);

      const response = await auth.clone().send_announce();
      const announceLink = response.get_link();
      const anchorage = announceLink.msg_id;

      const publicPayload = Buffer.from(args.msg as string);
      const maskedPayload = Buffer.from("");

      const anchoringResp = await auth.clone().send_signed_packet(announceLink,
        publicPayload, maskedPayload);

      const msgID = anchoringResp.get_link().msg_id;

      const result = {
        seed,
        channel: auth.channel_address(),
        anchorage,
        msgID
      };

      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      return false;
    }

    return true;
  }
}

/**
 * Generates a new seed
 * @param length Seed length
 *
 * @returns The seed
 */
function generateSeed(length: number = 20) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let seed = "";

  while (seed.length < length) {
    const bytes = crypto.randomBytes(1);
    seed += alphabet[bytes[0] % alphabet.length];
  }


  return seed;
}
