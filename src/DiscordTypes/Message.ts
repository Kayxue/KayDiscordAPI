import { snowflake } from "../Types";
import { Embed } from "./Embed";

export class Message {
    public id: snowflake;
    public channel: any;
    public author: any;
    public content: string;
    public timestamp: any;
    public edited_timestamp: any;
    public tts: boolean;
    public mentionEveryone: boolean;
    public mentionUsers: any[];
    public mentionRoles: any[];
    public mentionChannels: any[];
    public attachments: any[];
    public embeds: any[];
    public reactions: any[];
    public nonce: number | string;
    public pinned: boolean;
    public webhookId?: snowflake;
    public type: number;
    public activity: any;
    public application: any;
    public applicationId: snowflake;
    public messageReference?: Message;
    public flags: number;
    public referencedMessage?: Message;
    public interaction?: any;
    public thread: any;
    public components: any[];
    public stickers?: any[];
    public position?: number;

    public async send(content:string|Embed){

    }
}
