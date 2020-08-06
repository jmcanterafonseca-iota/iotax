import {MamCommand} from "./commands/mamCommand";
import ICommand from "./ICommand";

const commandRegistry: Record<string, ICommand> = {
  mam: new MamCommand()
};

export default commandRegistry;
