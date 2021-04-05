import { DidCommand } from "./commands/did/didCommand";
import { MamCommand } from "./commands/mamCommand";
import ICommand from "./ICommand";

const commandRegistry: Record<string, ICommand> = {
  mam: new MamCommand(),
  did: new DidCommand()
};

export default commandRegistry;
