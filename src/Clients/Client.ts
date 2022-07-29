import { GuildTextBasedChannel } from "../DiscordTypes/GuildTextBasedChannel";
import { Message } from "../DiscordTypes/Message";
import { ClientEvents } from "../Types";
import { CacheManager } from "./CacheManager";
import { Requester } from "./Requester";
import WebSocketManager from "./WebSocketManager";

export class Client extends WebSocketManager {
    public requester = new Requester(this);
    public cacheManager = new CacheManager(this);

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
                for (const channelObj of data.d.channels) {
                    //TODO generate other types of object
                    const channel = new GuildTextBasedChannel(this, channelObj);
                    this.cacheManager.setChannel(channel.id, channel);
                }
                this.emit("guildCreate", data.d);
                break;
            case "MESSAGE_CREATE":
                const message = new Message(this, data.d);
                this.emit("messageCreate", message);
                break;
        }
    }
}
