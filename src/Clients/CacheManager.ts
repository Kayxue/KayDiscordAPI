import { DefaultCacheAdapter } from "../Adapter/DefaultCacheAdapter";
import BaseChannel from "../DiscordTypes/Base/BaseChannel";
import { CacheAdapter } from "../Types";
import { Client } from "./Client";

export class CacheManager {
    public client: Client;
    public cacheAdapter: CacheAdapter;

    public constructor(client: Client, cacheAdapter?: CacheAdapter) {
        this.client=client
        this.cacheAdapter=cacheAdapter??new DefaultCacheAdapter()
    }

    public getChannel(channelId: string) {
        return this.cacheAdapter.get("channel",channelId) as BaseChannel
    }

    public setChannel(channelId:string,value:BaseChannel){
        this.cacheAdapter.set("channel",channelId,value)
    }
}
