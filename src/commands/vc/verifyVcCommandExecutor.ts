import { checkCredential as verifyCredential,
  checkPresentation as verifyPresentation } from "@iota/identity-wasm/node";
import { Arguments } from "yargs";
import { isDefined } from "../../globalParams";

export default class VerifyVcCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    if (isDefined(args, "vc")) {
      return this.doVerifyCredential(args);
    } else if (isDefined(args, "vp")) {
      return this.doVerifyPresentation(args);
    }
  }

  public static async doVerifyPresentation(args: Arguments): Promise<boolean> {
    const vp = args.vp as string;

    try {
      const verification = await verifyPresentation(vp, {
        network: "mainnet"
      });

      console.log({ verified: verification.verified });
    } catch (error) {
      console.error("Error:", error);
      return false;
    }

    return true;
  }

  public static async doVerifyCredential(args: Arguments): Promise<boolean> {
    const vc = args.vc as string;

    try {
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
