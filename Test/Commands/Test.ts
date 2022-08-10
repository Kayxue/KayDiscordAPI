import { CommandClient } from "../../src/Clients/CommandsClient";
import { Cog } from "../../src/Commands/Cog/Cog";
import { command, once } from "../../src/Commands/Cog/Decorator";
import { Embed } from "../../src/DiscordTypes/Embed";
import { GuildTextBasedChannel } from "../../src/DiscordTypes/GuildTextBasedChannel";
import { Message } from "../../src/DiscordTypes/Message";

export default class Test extends Cog<CommandClient>{
    public constructor(client:CommandClient){
        super(client,{
            name:"Test",
            description:"Test Category"
        })
    }
    
    @command()
    public async hi(message:Message,args:string){
        return (message.channel as GuildTextBasedChannel).send(new Embed().setTitle("w").setColor("#C8F4FB"))
    }

    @once
    public async ready(){
        console.log("bot is ready")
    }
}