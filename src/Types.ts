import { Message } from "./DiscordTypes/Message";

export enum GatewayIntents {
    GUILDS = 1 << 0,
    GUILD_MEMBERS = 1 << 1,
    GUILD_BANS = 1 << 2,
    GUILD_EMOJIS_AND_STICKERS = 1 << 3,
    GUILD_INTEGRATIONS = 1 << 4,
    GUILD_WEBHOOKS = 1 << 5,
    GUILD_INVITES = 1 << 6,
    GUILD_VOICE_STATES = 1 << 7,
    GUILD_PRESENCES = 1 << 8,
    GUILD_MESSAGES = 1 << 9,
    GUILD_MESSAGE_REACTIONS = 1 << 10,
    GUILD_MESSAGE_TYPING = 1 << 11,
    DIRECT_MESSAGES = 1 << 12,
    DIRECT_MESSAGE_REACTIONS = 1 << 13,
    DIRECT_MESSAGE_TYPING = 1 << 14,
    MESSAGE_CONTENT = 1 << 15,
    GUILD_SCHEDULED_EVENTS = 1 << 16,
    AUTO_MODERATION_CONFIGURATION = 1 << 20,
    AUTO_MODERATION_EXECUTION = 1 << 21,
}

export interface ClientInitOptions {
    intents: GatewayIntents[];
    token?: string;
}

export interface CommandClientInitOptions extends ClientInitOptions{
    prefix:string[],
    directory:string
}

export enum GatewayOpCode {
    HELLO = 10,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    DISPATCH = 0,
}

export interface ClientEvents {
    ready: [];
    messageCreate: [Message];
    guildCreate: [any];
}

export type snowflake = string;

export enum channelTypes {
    GUILD_TEXT = 0,
    DM,
    GUILD_VOICE,
    GROUP_DM,
    GUILD_CATEGORY,
    GUILD_NEWS,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD,
    GUILD_PRIVATE_THREAD,
    GUILD_STAGE_THREAD,
    GUILD_DIRECTORY,
    GUILD_FORUM,
}

export interface CacheAdapter {
    set(cacheName: string, key: string, data: any): any;
    get(cacheName: string, key: string): any;
    delete(cacheName: string, key: string): any;
}

export enum DefaultMessageNotificationLevel{
    ALL_MESSAGES=0,
    ONLY_MENTIONS
}

export enum ExplicitContentFilterLevel{
    DISABLED=0,
    MEMBERS_WITHOUT_ROLES,
    ALL_MEMBERS
}

export enum MFALevel{
    NONE=0,
    ELEVATED
}

export enum VerificationLevel{
    NONE=0,
    LOW,
    MEDIUM,
    HIGH,
    VERY_HIGH
}

export enum GuildNSFWLevel{
    DEFAULT=0,
    EXPLICIT,
    SAFE,
    AGE_RESTRICTED
}

export enum PremiumTier{
    NONE=0,
    TIER_1,
    TIER_2,
    TIER_3
}


