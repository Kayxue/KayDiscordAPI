import { snowflake } from "../Types";
import { Embed } from "./Embed";
import moment, { Moment } from "moment-timezone";
import { Client } from "../Clients/Client";

export class Message {
    public id: snowflake;
    //TODO:change to channel object
    public channel_id: string;
    public author: any;
    public content: string;
    public timestamp: Moment;
    public edited_timestamp?: Moment;
    public tts: boolean;
    public mentionEveryone: boolean;
    public mentionUsers: any[];
    public mentionRoles: any[];
    public mentionChannels: any[];
    public attachments: any[];
    public embeds: Embed[];
    public reactions: any[];
    public nonce: number | string;
    public pinned: boolean;
    public webhookId?: snowflake;
    public type: number;
    public activity: any;
    public application: any;
    public applicationId: snowflake;
    public messageReference?: IMessageReference;
    public flags: number;
    public referencedMessage?: Message;
    public interaction?: any;
    public thread: any;
    public components: any[];
    public sticker_items?: any[];
    public position?: number;
    public client: Client;
    public member?: any;
    //TODO:change to guild object
    public guild_id?: any;

    public constructor(client: Client, data: any) {
        this.type = data.type;
        this.tts = data.tts;
        this.timestamp = moment(data.timestamp);
        this.edited_timestamp = data.edited_timestamp
            ? moment(data.edited_timestamp)
            : undefined;
        this.referencedMessage = data.referenced_message
            ? new Message(client, data.referenced_message)
            : null;
        this.messageReference = data.message_reference;
        this.pinned = data.pinned;
        this.nonce = data.nonce;
        //TODO: change to user object
        this.mentionUsers = data.mentions;
        //TODO: change to role object
        this.mentionRoles = data.mention_roles;
        this.mentionEveryone = data.mention_everyone;
        //TODO: change to member object
        this.member = data.member;
        this.id = data.id;
        this.flags = data.flags;
        this.embeds = data.embeds?.map((e: any) => new Embed(e));
        this.content = data.content;
        //TODO: change to component object
        this.components = data.components;
        //TODO: add channel object
        this.channel_id = data.channel_id;
        //TODO: change to user object
        this.author = data.author;
        //TODO: add guild object
        this.guild_id = data.guild_id;
        //TODO: change to attachment object
        this.attachments = data.attachments;
        this.position = data.position;
        //TODO: change to sticker object
        this.sticker_items = data.sticker_items;
        //TODO: change to channel object
        this.thread = data.thread;
        //TODO: change to interaction object
        this.interaction = data.interaction;
        this.flags = data.flags;
        //TODO: change to application object
        this.application = data.application;
        this.applicationId = data.applicationId;
        //TODO: change to activity object
        this.activity = data.activity;
        this.webhookId = data.webhook_id;
        this.client = client;
        //TODO: change to reaction object
        this.reactions = data.reactions;
    }
    /*
        {
            t: 'MESSAGE_CREATE',
            s: 64,
            op: 0,
            d: {
                type: 0,
                tts: false,
                timestamp: '2022-07-25T01:04:10.700000+00:00',
                referenced_message: null,
                pinned: false,
                nonce: '1000931486209146880',
                mentions: [],
                mention_roles: [],
                mention_everyone: false,
                member: {
                    roles: [Array],
                    premium_since: null,
                    pending: false,
                    nick: null,
                    mute: false,
                    joined_at: '2021-08-21T07:54:53.931000+00:00',
                    flags: 0,
                    deaf: false,
                    communication_disabled_until: null,
                    avatar: null
                },
                id: '1000931435793891410',
                flags: 0,
                embeds: [],
                edited_timestamp: null,
                content: 'w',
                components: [],
                channel_id: '949477322757668924',
                author: {
                    username: '美味的小圓',
                    public_flags: 256,
                    id: '470516498050580480',
                    discriminator: '2560',
                    avatar_decoration: null,
                    avatar: 'cea0a5327cd8e9e7616eafbd41206d5d'
                },
                attachments: [],
                guild_id: '878547698247155742'
            }
        }
    */
    /*
    {
    t: 'MESSAGE_CREATE',
    s: 180,
    op: 0,
    d: {
        type: 19,
        tts: false,
        timestamp: '2022-07-25T04:24:36.409000+00:00',
        referenced_message: {
        type: 19,
        tts: false,
        timestamp: '2022-07-25T04:21:01.009000+00:00',
        pinned: false,
        message_reference: [Object],
        mentions: [],
        mention_roles: [],
        mention_everyone: false,
        id: '1000980971820175440',
        flags: 0,
        embeds: [],
        edited_timestamp: null,
        content: 'k',
        components: [],
        channel_id: '949477322757668924',
        author: [Object],
        attachments: []
        },
        pinned: false,
        nonce: '1000981925201969152',
        message_reference: {
        message_id: '1000980971820175440',
        guild_id: '878547698247155742',
        channel_id: '949477322757668924'
        },
        mentions: [],
        mention_roles: [],
        mention_everyone: false,
        member: {
        roles: [Array],
        premium_since: null,
        pending: false,
        nick: null,
        mute: false,
        joined_at: '2021-08-21T07:54:53.931000+00:00',
        flags: 0,
        deaf: false,
        communication_disabled_until: null,
        avatar: null
        },
        id: '1000981875273257040',
        flags: 0,
        embeds: [],
        edited_timestamp: null,
        content: 'l',
        components: [],
        channel_id: '949477322757668924',
        author: {
        username: '美味的小圓',
        public_flags: 256,
        id: '470516498050580480',
        discriminator: '2560',
        avatar_decoration: null,
        avatar: 'cea0a5327cd8e9e7616eafbd41206d5d'
        },
        attachments: [],
        guild_id: '878547698247155742'
    }
    }
   */

    public async crosspost() {
        //TODO 進階處理
        return await this.client.requester.crosspostMessage(this.channel_id, this.id);
    }

    public async delete() {
        //TODO 進階處理
        return await this.client.requester.deleteMessage(this.channel_id, this.id);
    }

    public async fetch(){
        //TODO 進階處理
        return await this.client.requester.getMessage(this.channel_id,this.id)
    }

    public async react(emoji:string){
        //TODO 進階處理
        return await this.client.requester.react(this.channel_id,this.id,emoji)
    }
}

export interface IMessageReference {
    messageId: string;
    guildId: string;
    channelId: string;
}
