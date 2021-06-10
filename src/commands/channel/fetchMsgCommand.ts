import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import FetchMsgCommandExecutor from "./fetchMsgCommandExecutor";

const params: ICommandParam[] = [
  {
    name: "channel",
    options: {
      type: "string",
      description: "ID of the Channel from which to fetch the message",
      required: false
    }
  },
  {
    name: "msgID",
    options: {
      type: "string",
      description: "The ID of the message to be fetched",
      required: false
    }
  },
  {
    name: "anchorageID",
    options: {
      type: "string",
      description: "The anchorage ID of the message to be fetched",
      required: false
    }
  }
];

export default class FetchMsgCommand implements ICommand {
  public subCommands: null;

  public name: string = "fetch";

  public description: string = "Fetchs a message previously anchored to an IOTA Streams Channel";

  public async execute(args: Arguments): Promise<boolean> {
    return FetchMsgCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });
  }
}
