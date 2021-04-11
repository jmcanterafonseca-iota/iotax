import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import IssueVcCommandExecutor from "./issueVcCommandExecutor";

const params: ICommandParam[] = [
  {
    name: "issuer",
    options: {
      type: "string",
      description: "DID of the issuer of the VC",
      required: true
    }
  },
  {
    name: "subject",
    options: {
      type: "string",
      description: "(D)ID of the subject of the VC",
      required: true
    }
  },
  {
    name: "claims",
    options: {
      type: "string",
      description: "Credential claim data (As a JSON Object)",
      required: true
    }
  },
  {
    name: "type",
    options: {
      type: "string",
      description: "Credential type",
      required: true
    }
  }
];

export default class IssueVcCommand implements ICommand {
  public subCommands: null;

  public name: string = "issue";

  public description: string = "VC issuance";

  public async execute(args: Arguments): Promise<boolean> {
    return IssueVcCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });
  }
}