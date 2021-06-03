/* eslint-disable no-duplicate-imports */
import { Document, resolve as iotaDidResolve, VerifiableCredential, VerifiablePresentation } from "@iota/identity-wasm/node";
import { Arguments } from "yargs";

export default class PresentVcCommandExecutor {
  public static async execute(args: Arguments): Promise<boolean> {
    const credential = args.vc as string;
    const presentationType = args.type as string;
    const presentationId = args.id as string;

    try {
      const credentialObj = JSON.parse(credential);
      const holderDid = credentialObj.credentialSubject.id;

      const holderDoc: Document = await iotaDidResolve(holderDid, {
        network: "mainnet"
      });

      const holderDocument = Document.fromJSON(holderDoc);

      const vp = new VerifiablePresentation(holderDocument,
        VerifiableCredential.fromJSON(credentialObj), presentationType, presentationId);

      const signedPresentation = holderDocument.signPresentation(vp, {
        secret: args.secret,
        method: holderDocument.resolveKey(args.method as string).toJSON().id
      });

      let output = signedPresentation.toJSON();
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
}