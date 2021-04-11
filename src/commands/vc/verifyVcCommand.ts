import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import VerifyVcCommandExecutor from "./verifyVcCommandExecutor";

const params: ICommandParam[] = [
  {
    name: "vc",
    options: {
      type: "string",
      description: "Verifiable Credential to be verified",
      required: true
    }
  }
];


export default class VerifyVcCommand implements ICommand {
  public subCommands: null;

  public name: string = "verify";

  public description: string = "VC verification";

  public async execute(args: Arguments): Promise<boolean> {
    return VerifyVcCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });
  }
}
