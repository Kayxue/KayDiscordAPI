import { CommandManager } from "../Commands/CommandManager";
import { CommandClientInitOptions } from "../Types";
import { Client } from "./Client";

export class CommandClient extends Client {
    public commandManager = new CommandManager(this);
    public prefixes: string[];

    public constructor(options: CommandClientInitOptions) {
        super(options);
        this.prefixes = options.prefix;
        this.on("messageCreate", (message) => {
            const prefix = this.prefixes.find((e) =>
                message.content.startsWith(e),
            );
            if (!prefix) return;
            this.commandManager.handle(message, prefix);
        });
        this.commandManager.directory=options.directory
        this.commandManager.loadCommands()
    }
}
