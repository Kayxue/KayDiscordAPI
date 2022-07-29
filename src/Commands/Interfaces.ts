import { Message } from "../DiscordTypes/Message";

export interface ICommandInfo {
    name: string;
    description?: string;
    aliases?: string;
    usage?: string;
    category?: string | ICategory;
}

export interface ICategory {
    name: string;
    description: string;
}

export interface ICommand {
    getInfo(): ICommandInfo;
    handle(message: Message, args: string[]): Promise<any>;
}
