/* eslint-disable no-duplicate-imports */
import * as crypto from "crypto";
import { Address, Author, Subscriber, ChannelType, SendOptions } from "wasm-node/iota_streams_wasm";
import { Arguments } from "yargs";
import { isDefined } from "../../globalParams";
import { getNetworkParams } from "../commonParams";

export default class AnchorMsgCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    const node = getNetworkParams(args).network;

    let seed = "";
    if (!isDefined(args, "seed")) {
      seed = this.generateSeed();
    } else {
      seed = args.seed as string;
    }

    if (!isDefined(args, "channel")) {
      return this.anchorMsgAsAuthor(node, seed, args);
    }

    return this.anchorMsgAsSubscriber(node, seed, args);
  }


  /**
   *  Anchors the message as Author
   *
   * @param node Node to be used
   * @param seed Seed to be used
   * @param args Command line arguments
   * @returns boolean indicating success or error
   */
  private static async anchorMsgAsAuthor(node: string, seed: string, args: Arguments): Promise<boolean> {
    try {
      const options = new SendOptions(node, true);
      const auth = new Author(seed, options.clone(), ChannelType.SingleBranch);

      const response = await auth.clone().send_announce();
      const announceLink = response.get_link();
      const anchorageID = announceLink.msg_id;

      const publicPayload = Buffer.from(args.msg as string);
      const maskedPayload = Buffer.from("");

      const anchoringResp = await auth.clone().send_signed_packet(announceLink,
        publicPayload, maskedPayload);

      const msgID = anchoringResp.get_link().msg_id;

      const result = {
        seed,
        channel: `${auth.channel_address()}:${anchorageID}`,
        anchorageID,
        msgID
      };

      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      return false;
    }

    return true;
  }

  /**
   *  Anchors the message as Author
   *
   * @param node Node to be used
   * @param seed Seed to be used
   * @param args Command line arguments
   * @returns boolean indicating success or error
   */
  private static async anchorMsgAsSubscriber(node: string, seed: string, args: Arguments): Promise<boolean> {
    try {
      const options = new SendOptions(node, true);
      const subs = new Subscriber(seed, options.clone());

      // Channel contains the channel address and the announce messageID
      const channel = args.channel as string;
      const announceLink = Address.from_string(channel);

      const channelId = announceLink.addr_id;

      await subs.clone().receive_announcement(announceLink);

      // The address of the anchorage message
      const anchorageID = args.anchorageID as string;
      const anchorageMsgAddress = Address.from_string(`${channelId}:${anchorageID}`);

      // Iteratively retrieve messages until We find the one to anchor to
      const message = await subs.clone().receive_msg(anchorageMsgAddress);
      const anchorageMsgLink = message.get_link();
      console.log(anchorageMsgLink);

      const publicPayload = Buffer.from(args.msg as string);
      const maskedPayload = Buffer.from("");

      const anchoringResp = await subs.clone().send_signed_packet(anchorageMsgLink,
        publicPayload, maskedPayload);

      const msgID = anchoringResp.get_link().msg_id;

      const result = {
        seed,
        channel,
        anchorageID,
        msgID
      };

      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      return false;
    }

    return true;
  }


  /**
   * Generates a new seed
   * @param length Seed length
   *
   * @returns The seed
   */
  private static generateSeed(length: number = 20) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    let seed = "";

    while (seed.length < length) {
      const bytes = crypto.randomBytes(1);
      seed += alphabet[bytes[0] % alphabet.length];
    }


    return seed;
  }
}
