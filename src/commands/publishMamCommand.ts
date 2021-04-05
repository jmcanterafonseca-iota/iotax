import { Arguments, Argv } from "yargs";
import ICommand from "../ICommand";
import ICommandParam from "../ICommandParam";
import { seedParam } from "./commonParams";
import PublishMamCommandExecutor from "./publishMamCommandExecutor";

const publishSeedParam: ICommandParam = JSON.parse(JSON.stringify(seedParam)) as ICommandParam;
publishSeedParam.options.required = true;

const params: ICommandParam[] = [
  publishSeedParam,
  {
    name: "sidekey",
    options: {
      type: "string",
      description: "Sidekey for restricted channels",
      default: undefined,
      global: false
    }
  },
  {
    name: "message", options: {
      alias: "msg",
      type: "string",
      description: "JSON message to be published",
      required: true
    }
  },
  {
    name: "index", options:
    {
      alias: "i",
      type: "number",
      default: 0,
      description: "Start index used to publish"
    }
  }
];

export default class PublishMamCommand implements ICommand {
  public subCommands: null;

  public name: string = "publish";

  public description: string = "MAM Channel Publish";

  public async execute(args: Arguments): Promise<boolean> {
    return PublishMamCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });
  }
}
