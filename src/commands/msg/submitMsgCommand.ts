import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import SubmitMsgCommandExecutor from "./submitMsgCommandExecutor";

const params: ICommandParam[] = [
  {
    name: "msg",
    options: {
      type: "string",
      description: "Message to be submitted",
      required: true
    }
  }
];


export default class SubmitMsgCommand implements ICommand {
  public subCommands: null;

  public name: string = "submit";

  public description: string = "Message submission";

  public async execute(args: Arguments): Promise<boolean> {
    return SubmitMsgCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });
  }
}
