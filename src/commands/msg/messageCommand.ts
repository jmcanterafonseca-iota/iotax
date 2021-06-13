import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import FetchMsgCommand from "../channel/fetchMsgCommand";
import SubmitMsgCommand from "./submitMsgCommand";

const params: ICommandParam[] = [];

const subCommands: Record<string, ICommand> = {
  submit: new SubmitMsgCommand(),
  fetch: new FetchMsgCommand()
};

export class MessageCommand implements ICommand {
    public name: string = "msg";

    public description: string = "Tangle message operations";

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
