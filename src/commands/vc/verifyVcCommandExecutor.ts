import { checkCredential as verifyCredential, VerifiableCredential } from "@iota/identity-wasm/node";
import { Arguments } from "yargs";

export default class VerifyVcCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    const vc = args.vc as string;

    try {
      VerifiableCredential.fromJSON(JSON.parse(vc));

      const verification = await verifyCredential(vc, {
        network: "mainnet"
      });

      console.log({ verified: verification.verified });
    } catch (error) {
      console.error("Error:", error);
      return false;
    }

    return true;
  }
}
