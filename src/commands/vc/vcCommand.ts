import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import IssueVcCommand from "./issueVcCommand";
import PresentVcCommand from "./presentVcCommand";
import VerifyVcCommand from "./verifyVcCommand";

const params: ICommandParam[] = [];

const subCommands: Record<string, ICommand> = {
  issue: new IssueVcCommand(),
  verify: new VerifyVcCommand(),
  present: new PresentVcCommand()
};

const checkFunction = argv => {
  if (argv.testnet || argv.comnet || argv.net) {
    throw new Error("Only the mainnet is supported for VCs");
  }

  return true;
};

const VC_TYPE = "VerifiableCredential";
const VP_TYPE = "VerifiablePresentation";

interface Credential {
 [key: string]: unknown;
}

/**
 * Validates a Verifiable Credential
 *
 * @param vc Verifiable Credential object
 *
 * @returns boolean indicating if validates or not
 *
 */
export function validateVc(vc: Credential) {
  return validateCredential(vc, VC_TYPE);
}

/**
 * Validates a Verifiable Presentation
 *
 * @param vp Verifiable Presentation object
 * @returns boolean indicating if validates or not
 */
export function validateVp(vp: Credential): boolean {
  if (validateCredential(vp, VP_TYPE)) {
    const credentials = vp.verifiableCredential;
    let credArray: Credential[] = [];

    if (Array.isArray(credentials)) {
      credArray = credentials as Credential[];
    } else {
      credArray.push(credentials as Credential);
    }

    for (const cred of credArray) {
      if (!validateVc(cred)) {
        return false;
      }
    }

    return true;
  }

    return false;
}

/**
 * Validates that the object represents a Vc or Vp
 *
 * @param cred The object to be validated
 *
 * @returns boolean indicating if validates or not
 */
export function validateVcOrVp(cred: Credential): boolean {
  if (!validateCredential(cred, VC_TYPE)) {
    return validateCredential(cred, VP_TYPE);
  }

  return true;
}

/**
 * Validates a credential that can be a Verifiable Credential or Verifiable Presentation
 *
 * @param vc Credential Object
 * @param credType Type of Credential "VerifiableCredential" or "VerifiablePresentation"
 *
 * @returns boolean indicating whether it validated or not
 */
function validateCredential(vc: { [key: string]: unknown }, credType: string): boolean {
  if (!vc.type) {
    return false;
  }

  if (Array.isArray(vc.type)) {
    const types = vc.type as string[];
    if (!types.includes(credType)) {
      return false;
    }
  } else if (typeof vc.type === "string") {
    if ((vc.type) !== credType) {
      return false;
    }
  }

  return true;
}

export class VcCommand implements ICommand {
  public name: string = "vc";

  public description: string = "Verifiable Credential operations";

  public subCommands: Record<string, ICommand> = subCommands;

  public async execute(args: Arguments): Promise<boolean> {
    return true;
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });

    yargs.check(checkFunction);

    Object.keys(subCommands).forEach(name => {
      const command: ICommand = subCommands[name];

      yargs.command(command.name,
        command.description,
        commandYargs => {
          command.register(commandYargs);
        },
        async commandYargs => command.execute(commandYargs)
      );
    });
  }
}
