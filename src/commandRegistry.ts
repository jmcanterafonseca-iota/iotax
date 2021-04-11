import { DidCommand } from "./commands/did/didCommand";
import { MamCommand } from "./commands/mam/mamCommand";
import { VcCommand } from "./commands/vc/vcCommand";
import ICommand from "./ICommand";

const commandRegistry: Record<string, ICommand> = {
  mam: new MamCommand(),
  did: new DidCommand(),
  vc: new VcCommand()
};

export default commandRegistry;
