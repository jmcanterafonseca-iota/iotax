import { Arguments, Argv } from "yargs";
import ICommand from "../ICommand";
import ICommandParam from "../ICommandParam";
import FetchMamCommandExecutor from "./fetchMamCommandExecutor";
import { seedParam } from "./mamParams";

const params: ICommandParam[] = [
  {
    name: "root",
    options: {
      alias: "r",
      type: "string",
      description: "MAM Channel's root",
      global: false
    }
  },
  {
    name: "limit",
    options: {
      alias: "l",
      type: "number",
      description: "Maximum number of messages to be fetched",
      global: false
    }
  },
  {
    name: "from",
    options: {
      alias: "f",
      type: "number",
      description: "Start Index for retrieval",
      global: false
    }
  },
  seedParam,
  {
    name: "chunksize",
    options: {
      type: "number",
      description: "Chunk size for retrieval",
      global: false
    }
  },
  {
    name: "partitions",
    options: {
      type: "number",
      description: "Number of partitions to use when fetching",
      default: 1,
      global: false
    }
  },
  {
    name: "combined",
    options: {
      type: "boolean",
      description: "MAM Fetch Combined",
      default: false,
      global: false
    }
  },
  {
    name: "watch", options: {
      alias: "w",
      type: "boolean",
      description: "Watch the MAM Channel",
      global: false
    }
  }
];

const conflicts = {
  root: ["from"],
  limit: ["watch"],
  partitions: ["watch"]
};

const checkFunction = argv => {
  if (typeof argv.from !== "undefined" && !argv.seed) {
    throw new Error(
      "Missing seed. Seed must be provided when start index (from) is provided"
    );
  }
  if (typeof argv.from === "undefined" && !argv.root && !argv.seed) {
    throw new Error("Missing MAM Channel's root or seed");
  }

  return true;
};

export default class FetchMamCommand implements ICommand {
  public subCommands: null;
  public name: string = "fetch";
  public description: string = "MAM Channel Fetch";

  public async execute(args: Arguments): Promise<boolean> {
    return await FetchMamCommandExecutor.execute(args);
  }

  public register(yargs: Argv): void {
    params.forEach(aParam => {
      yargs.option(aParam.name, aParam.options);
    });

    yargs.conflicts(conflicts);

    yargs.check(checkFunction);
  }
}
