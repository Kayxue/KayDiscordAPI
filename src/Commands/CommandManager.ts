import { Client } from "../Clients/Client";
import { Command } from "./Command";
import { ICategory, ICommand, ICommandInfo } from "./Interfaces";
import { promisify } from "util";
import glob1 from "glob";
import { Cog } from "./Cog/Cog";
import { Message } from "../DiscordTypes/Message";
const glob = promisify(glob1);

export class CommandManager<T extends Client> {
    public commandsCollection = new Map<string, ICommand | Command>();
    public aliasesCollection = new Map<string, string>();
    public commandCategories = new Map<string, string[]>();
    public categoryInfo = new Map<string, ICategory>();
    public client: T;
    public directory:string

    public constructor(client: T) {
        this.client = client;
    }

    public async loadCommands() {
        return glob(`${this.directory}/**/*.{ts,js}`).then((files) => {
            this.commandCategories.set("No Categories", []);
            for (const file of files) {
                const cmdOrCog = require(file).default ?? require(file);
                const cmdOrCogClass = new cmdOrCog(this.client);
                if (cmdOrCogClass instanceof Cog) {
                    const propertyNames = Object.getOwnPropertyNames(
                        cmdOrCog.prototype,
                    );
                    const commandMethodKeys = propertyNames.filter((e) =>
                        e.startsWith("cmd"),
                    );
                    const eventMethodKeys = propertyNames.filter((e) =>
                        e.startsWith("onEvent"),
                    );
                    this.commandCategories.set(cmdOrCog.name, []);
                    for (const command of commandMethodKeys) {
                        const cmdInfo = cmdOrCogClass[command]();
                        const binedMethod = cmdInfo.run.bind(cmdOrCogClass);
                        const toPush: ICommand = {
                            getInfo() {
                                return {
                                    name: cmdInfo.name,
                                };
                            },
                            async handle(message, args) {
                                binedMethod(message, args);
                            },
                        };
                        this.commandsCollection.set(cmdInfo.name, toPush);
                        this.commandCategories
                            .get(cmdOrCog.name)
                            .push(cmdInfo.name);
                    }
                    for (const event of eventMethodKeys) {
                        const eventInfo = cmdOrCogClass[event]();
                        const binedMethod = eventInfo.run.bind(cmdOrCogClass);
                        this.client[eventInfo.type](
                            eventInfo.event,
                            (...args) => binedMethod(...args),
                        );
                    }
                } else if (cmdOrCogClass instanceof Command) {
                    const cmdInfo = cmdOrCogClass.getInfo();
                    this.commandsCollection.set(cmdInfo.name, cmdOrCogClass);
                    if (cmdInfo.aliases) {
                        for (const aliase of cmdInfo.aliases) {
                            this.aliasesCollection.set(aliase, cmdInfo.name);
                        }
                    }
                } else {
                    if (!this.isCommand(cmdOrCog))
                        throw new Error("This class is not a command or cog!");
                    const cmdInfo: ICommandInfo = cmdOrCogClass.getInfo();
                    this.commandsCollection.set(cmdInfo.name, cmdOrCogClass);
                    if (cmdInfo.aliases) {
                        for (const aliase of cmdInfo.aliases) {
                            this.aliasesCollection.set(aliase, cmdInfo.name);
                        }
                    }
                }
            }
        });
    }

    public isCommand(obj: any): boolean {
        const keys = Object.getOwnPropertyNames(obj.prototype);
        return keys.includes("handle") && keys.includes("getInfo");
    }

    public getCommand(cmd: string) {
        return (
            this.commandsCollection.get(cmd) ??
            this.commandsCollection.get(this.aliasesCollection.get(cmd))
        );
    }

    public async handle(message: Message, prefix: string) {
        const [cmd, ...args] = message.content
            .slice(prefix.length)
            .split(/ +/g);
        const cmdObj = this.getCommand(cmd);
        cmdObj?.handle(message, args);
    }
}
