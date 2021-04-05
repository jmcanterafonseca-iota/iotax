/* eslint-disable no-duplicate-imports */
import { Document, KeyType, publish as iotaDidPublish } from "@iota/identity-wasm/node";
import type { NewDocument } from "@iota/identity-wasm/node";
import { Arguments } from "yargs";

export default class CreateDidCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    if (args.devnet || args.comnet || args.net) {
      console.error("Error: Only the mainnet is supported for DIDs");
      return false;
    }

    const { doc, key } = (new Document(KeyType.Ed25519) as unknown) as NewDocument;
    doc.sign(key);

    const transactionId = await iotaDidPublish(doc, {
      network: "mainnet"
    });

    console.log({
      did: doc.toJSON().id,
      keys: {
        public: key.public,
        private: key.secret
      },
      transactionUrl: `https://explorer.iota.org/mainnet/transaction/${transactionId}`
    });

    return true;
  }
}
