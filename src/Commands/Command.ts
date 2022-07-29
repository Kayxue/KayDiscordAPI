import { CommandClient } from "../Clients/CommandsClient";
import { Message } from "../DiscordTypes/Message";
import { ICommandInfo } from "./Interfaces";

export abstract class Command{
    public client:CommandClient
    private info:ICommandInfo

    public constructor(client:CommandClient,info:ICommandInfo){
        this.client=client
        this.info=info
    }

    public getInfo(){
        return this.info
    }

    public abstract handle(message:Message,args:string[]):Promise<any>
}