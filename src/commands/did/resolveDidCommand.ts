import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import CreateDidCommandExecutor from "./createDidCommandExecutor";

const params: ICommandParam[] = [];


const checkFunction = argv => true;

export default class ResolveDidCommand implements ICommand {
  public subCommands: null;

  public name: string = "resolve";

  public description: string = "DID resolution";

  public async execute(args: Arguments): Promise<boolean> {
    return CreateDidCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });

    yargs.check(checkFunction);
  }
}
