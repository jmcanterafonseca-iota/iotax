import { DidCommand } from "./commands/did/didCommand";
import { VcCommand } from "./commands/vc/vcCommand";
import ICommand from "./ICommand";

const commandRegistry: Record<string, ICommand> = {
  did: new DidCommand(),
  vc: new VcCommand()
};

export default commandRegistry;
