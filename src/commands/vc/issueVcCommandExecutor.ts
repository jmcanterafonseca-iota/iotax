/* eslint-disable no-duplicate-imports */
import { Document, resolve as iotaDidResolve, VerifiableCredential } from "@iota/identity-wasm/node";
import { Arguments } from "yargs";

export default class IssueVcCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    const issuerDid = args.issuer as string;
    const subjectId = args.subject as string;

    const claims = this.getClaims(args.claims as string);

    if (!claims) {
      return false;
    }

    try {
      claims.id = subjectId;

      const issDoc: Document = await iotaDidResolve(issuerDid, {
        network: "mainnet"
      });

      const issDocument = Document.fromJSON(issDoc);

      const vc = VerifiableCredential.extend({
        id: args.id as string,
        type: args.type as string,
        issuer: issDoc.id,
        credentialSubject: claims
      });

      const signedVc = issDocument.signCredential(vc, {
        secret: args.secret,
        method: issDocument.resolveKey(args.method as string).toJSON().id
      });

      let output = signedVc.toJSON();
      if (args.json) {
        output = JSON.stringify(output, undefined, 2);
      }

      console.log(output);
    } catch (error) {
      console.log("Error:", error);
      return false;
    }

    return true;
  }

  private static getClaims(claimsStr: string): { [key: string]: unknown } | undefined {
    let claims;

    try {
      claims = JSON.parse(claimsStr);
      if (typeof claims !== "object" || Array.isArray(claims)) {
        console.error("The claims data has to be provided as a JSON object");
        claims = undefined;
      }
    } catch {
      console.error("Invalid claims object supplied");
    }

    // eslint-disable-next-line  @typescript-eslint/no-unsafe-return
    return claims;
  }
}
