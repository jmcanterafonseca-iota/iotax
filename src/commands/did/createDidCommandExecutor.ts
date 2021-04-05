/* eslint-disable no-duplicate-imports */

import { Document, KeyType, publish as iotaDidPublish } from "@iota/identity-wasm/node";
import type { NewDocument } from "@iota/identity-wasm/node";
import { inspect } from "util";
import { Arguments } from "yargs";

export default class CreateDidCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    const { doc, key } = (new Document(KeyType.Ed25519) as unknown) as NewDocument;

    doc.sign(key);

    const transactionId = await iotaDidPublish(doc, {
      network: "main"
    });

    console.log(inspect({
      did: doc.toJSON().id,
      keys: {
        public: key.public,
        private: key.secret
      },
      transactionUrl: `https://explorer.iota.org/mainnet/transaction/${transactionId}`
    }, { showHidden: false, depth: Infinity, colors: true })
    );

    return true;
  }
}
