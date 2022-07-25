import { Message } from "../DiscordTypes/Message";
import { ClientEvents } from "../Types";
import { Requester } from "./Requester";
import WebSocketManager from "./WebSocketManager";

export class Client extends WebSocketManager {
    public requester = new Requester(this);

    public on<K extends keyof ClientEvents>(
        event: K,
        listener: (...args: ClientEvents[K]) => any,
    ): any {
        super.on(event, listener);
    }

    protected handleDispatch(data: any) {
        switch (data.t) {
            case "READY":
                super.setS(data.s);
                this.emit("ready");
                break;
            case "GUILD_CREATE":
                this.emit("guildCreate", data.d);
                break;
            case "MESSAGE_CREATE":
                const message = new Message(this,data.d);
                this.emit("messageCreate",message)
                break;
        }
    }
}
