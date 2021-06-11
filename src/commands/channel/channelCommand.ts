import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import AnchorMsgCommand from "./anchorMsgCommand";
import FetchMsgCommand from "./fetchMsgCommand";

const params: ICommandParam[] = [];

const subCommands: Record<string, ICommand> = {
  anchor: new AnchorMsgCommand(),
  fetch: new FetchMsgCommand()
};

export class ChannelCommand implements ICommand {
  public name: string = "channel";

  public description: string = "IOTA Streams Anchoring Channels operations";

  public subCommands: Record<string, ICommand> = subCommands;

  public async execute(args: Arguments): Promise<boolean> {
    return true;
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });

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
