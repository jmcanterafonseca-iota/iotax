import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import { seedParam } from "../commonParams";
import AnchorMsgCommandExecutor from "./anchorMsgCommandExecutor";

const params: ICommandParam[] = [
  seedParam,
  {
    name: "msg",
    options: {
      type: "string",
      description: "(JSON) Message to be anchored",
      required: true
    }
  },
  {
    name: "channel",
    options: {
      type: "string",
      description: "ID of the Channel to anchor the message to",
      required: false
    }
  },
  {
    name: "anchorageID",
    options: {
      type: "string",
      description: "The anchorage point (message) ID to anchor the message to",
      required: false
    }
  }
];

export default class AnchorMsgCommand implements ICommand {
  public subCommands: null;

  public name: string = "anchor";

  public description: string = "Anchors a message to an IOTA Streams Channel";

  public async execute(args: Arguments): Promise<boolean> {
    return AnchorMsgCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });
  }
}
