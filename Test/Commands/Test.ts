import { CommandClient } from "../../src/Clients/CommandsClient";
import { Cog } from "../../src/Commands/Cog/Cog";
import { command, once } from "../../src/Commands/Cog/Decorator";
import { GuildTextBasedChannel } from "../../src/DiscordTypes/GuildTextBasedChannel";
import { Message } from "../../src/DiscordTypes/Message";

export default class Test extends Cog<CommandClient>{
    @command()
    public async hi(message:Message,args:string){
        return (message.channel as GuildTextBasedChannel).send("Hello")
    }

    @once
    public async ready(){
        console.log("bot is ready")
    }
}