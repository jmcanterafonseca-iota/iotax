import { Arguments, Argv } from "yargs";
import ICommand from "../ICommand";
import ICommandParam from "../ICommandParam";
import FetchMamCommand from "./fetchMamCommand";
import PublishMamCommand from "./publishMamCommand";

const params: ICommandParam[] = [{
  name: "mode", options: {
    alias: "m",
    type: "string",
    description: "MAM Channel mode",
    choices: ["public", "private", "restricted"],
    required: true,
    global: true
  }
}
];

const subCommands: Record<string, ICommand> = {
  fetch: new FetchMamCommand(),
  publish: new PublishMamCommand()
};

const checkFunction = argv => {
  if (argv.mode === "restricted" && !argv.sidekey) {
    throw new Error("Missing sidekey for fetching or publishing to a MAM restricted channel");
  } else {
    return true;
  }
};

export class MamCommand implements ICommand {
  public name: string = "mam";
  public description: string = "MAM Channel Operations";
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
                    command.execute
      );
    });
  }
}
