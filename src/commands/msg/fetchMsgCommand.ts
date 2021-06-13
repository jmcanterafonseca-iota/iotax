import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import FetchMsgCommandExecutor from "../channel/fetchMsgCommandExecutor";

const params: ICommandParam[] = [
  {
    name: "msgID",
    options: {
      type: "string",
      description: "Id of the message to be fetch",
      required: true
    }
  }
];


export default class FetchMsgCommand implements ICommand {
  public subCommands: null;

  public name: string = "fetch";

  public description: string = "Message fetch";

  public async execute(args: Arguments): Promise<boolean> {
    return FetchMsgCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });
  }
}
