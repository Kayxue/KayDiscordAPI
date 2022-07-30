import { CommandClient } from "../../src/Clients/CommandsClient";
import { Cog } from "../../src/Commands/Cog/Cog";
import { command, once } from "../../src/Commands/Cog/Decorator";
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
        console.log(this.client)
    }

    @once
    public async ready(){
        console.log("bot is ready")
    }
}