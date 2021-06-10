import { ChannelCommand } from "./commands/channel/channelCommand";
import { DidCommand } from "./commands/did/didCommand";
import { VcCommand } from "./commands/vc/vcCommand";
import ICommand from "./ICommand";

const commandRegistry: Record<string, ICommand> = {
  did: new DidCommand(),
  vc: new VcCommand(),
  channel: new ChannelCommand()
};

export default commandRegistry;
