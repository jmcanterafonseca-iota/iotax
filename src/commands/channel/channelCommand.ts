import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import AnchorMsgCommand from "./anchorMsgCommand";

const params: ICommandParam[] = [];

const subCommands: Record<string, ICommand> = {
  anchor: new AnchorMsgCommand()
};

const checkFunction = argv => {
  if (argv.testnet || argv.comnet || argv.net) {
    throw new Error("Only the mainnet is supported for Streams");
  }

  return true;
};

export class ChannelCommand implements ICommand {
  public name: string = "channel";

  public description: string = "IOTA Streams Channel operations";

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
