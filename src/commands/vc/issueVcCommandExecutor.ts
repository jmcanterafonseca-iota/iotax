/* eslint-disable no-duplicate-imports */
import { Document, resolve as iotaDidResolve, VerifiableCredential } from "@iota/identity-wasm/node";
import { Arguments } from "yargs";

export default class IssueVcCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    const issuerDid = args.issuer as string;
    const subjectId = args.subject as string;

    const credential = this.getCredential(args.credential as string);

    if (!credential) {
      return false;
    }

    const issDocument: Document = await iotaDidResolve(issuerDid, {
      network: "mainnet"
    });

    const vc = await VerifiableCredential.issue(issDocument, credential,
      args.type as string, subjectId);

    console.log(vc.toJSON());

    return true;
  }

  private static getCredential(credentialStr: string): unknown | undefined {
    let credential = undefined;

    try {
      credential = JSON.parse(credentialStr);
      if (typeof credential !== "object" || Array.isArray(credential)) {
        console.error("The credential data has to be provided as an object");
      }
    }
    catch (error) {
      console.error("Invalid credential object");
    }

    return credential;
  }
}
