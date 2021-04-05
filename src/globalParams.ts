import { Arguments } from "yargs";
import ICommandParam from "./ICommandParam";

export const globalParams: ICommandParam[] = [
  {
    name: "mainnet",
    options: {
      type: "boolean",
      description: "IOTA Mainnet",
      global: true
    }
  },
  {
    name: "devnet",
    options: {
      type: "boolean",
      description: "IOTA Devnet",
      global: true
    }
  },
  {
    name: "comnet",
    options: {
      type: "boolean",
      description: "IOTA Comnet",
      global: true
    }
  },
  {
    name: "net",
    options: {
      alias: "n",
      type: "string",
      description: "IOTA Network",
      global: true
    }
  }
];

export const globalConflicts = {
  mainnet: ["devnet", "comnet", "net"],
  devnet: ["mainnet", "comnet", "net"],
  comnet: ["mainnet", "devnet", "net"]
};

/**
 * Checks whether and argument is defined
 *
 * @param argv The Arguments
 * @param field The fields
 *
 * @returns whether the argument is defined or not
 *
 */
function isDefined(argv: Arguments, field: string): boolean {
  const value = argv[field];

  if (typeof (value) === "undefined") {
    return false;
  }

  if (value === false) {
    return false;
  }

  if (typeof (value) === "string" && value.trim().length === 0) {
    return false;
  }

  return true;
}

export const globalCheckFunction = argv => {
  if (!isDefined(argv, "net") &&
    !isDefined(argv, "devnet") && !isDefined(argv, "comnet") && !isDefined(argv, "mainnet")) {
    throw new Error(
      "Missing network. Use --mainnet, --devnet, --comnet or provide a custom URL using --net"
    );
  } else {
    return true;
  }
};
