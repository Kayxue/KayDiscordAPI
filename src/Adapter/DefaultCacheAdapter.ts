import BaseChannel from "../DiscordTypes/Base/BaseChannel";
import { CacheAdapter } from "../Types";

export class DefaultCacheAdapter implements CacheAdapter {
    public channelCache: Map<string, BaseChannel> = new Map();
    public set(cacheName: string, key: string, data: any) {
        switch (cacheName) {
            case "channel":
                return this.channelCache.set(key, data);
        }
    }

    public get(cacheName: string, key: string) {
        switch (cacheName) {
            case "channel":
                return this.channelCache.get(key);
        }
    }

    public delete(cacheName: string, key: string) {
        
    }
}
