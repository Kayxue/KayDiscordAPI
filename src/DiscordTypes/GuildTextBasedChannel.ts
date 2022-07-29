import { Client } from "../Clients/Client";
import { snowflake } from "../Types";
import { Embed } from "./Embed";
import { GuildChannel } from "./GuildChannel";

export class GuildTextBasedChannel extends GuildChannel {
    public nsfw: boolean;
    public topic: string;
    //TODO: change to last message object
    public lastMessageId: string;

    public constructor(client: Client, data: any) {
        super(client, data);
        this.nsfw = data.nsfw;
        this.topic = data.topic;
        this.lastMessageId = data.last_message_id;
    }

    public async send(embed: Embed);
    public async send(content: string, embed?: Embed);
    public async send(content: string, options?: MessageOptions);
    public async send(options: FullMessageOptions);
    public async send(
        contentOrEmbedOrOptions: string | Embed | FullMessageOptions,
        embedOrOptions?: Embed | MessageOptions,
    ) {
        if (typeof contentOrEmbedOrOptions === "string") {
            //第一個參數是文字
            if (!embedOrOptions) {
                //無其他選項
                const obj: FullMessageOptions = {
                    content: contentOrEmbedOrOptions,
                };
                return await this.client.requester.sendMessage(this.id, obj);
            } else {
                if (embedOrOptions instanceof Embed) {
                    const obj: FullMessageOptions = {
                        content: contentOrEmbedOrOptions,
                        embeds: [embedOrOptions],
                    };

                    return await this.client.requester.sendMessage(
                        this.id,
                        obj,
                    );
                }
            }
        } else if (contentOrEmbedOrOptions instanceof Embed) {
            //第一參數是Embed
            const obj: FullMessageOptions = {
                content: undefined,
                embeds: [contentOrEmbedOrOptions],
            };

            return await this.client.requester.sendMessage(this.id, obj);
        } else {
            //第一參數是FullMessageOptions
        }
    }

    public async bulkDelete(count: number) {
        return await this.client.requester.bulkDelete(this.id, count);
    }

    public async clone() {}

    public async createInvite(reason?: string);
    public async createInvite(maxAge?: number);
    public async createInvite(options?: CreateInviteOptions);
    public async createInvite(
        reasonOrMaxAgeOrOptions?: string | number | CreateInviteOptions,
    ) {
        if (reasonOrMaxAgeOrOptions === undefined) {
            return await this.client.requester.createChannelInvite(this.id, {});
        } else if (typeof reasonOrMaxAgeOrOptions === "string") {
            return await this.client.requester.createChannelInvite(this.id, {
                reason: reasonOrMaxAgeOrOptions,
            });
        } else if (typeof reasonOrMaxAgeOrOptions === "number") {
            return await this.client.requester.createChannelInvite(this.id, {
                max_age: reasonOrMaxAgeOrOptions,
            });
        } else {
            return await this.client.requester.createChannelInvite(this.id, {
                max_age: reasonOrMaxAgeOrOptions.maxAge,
                max_uses: reasonOrMaxAgeOrOptions.maxUses,
                target_application_id:
                    reasonOrMaxAgeOrOptions.targetApplicationId,
                target_user_id: reasonOrMaxAgeOrOptions.targetUserId,
                target_type: reasonOrMaxAgeOrOptions.targetType,
                temporary: reasonOrMaxAgeOrOptions.temporary,
                unique: reasonOrMaxAgeOrOptions.unique,
            });
        }
    }

    public async delete(){
        return await this.client.requester.deleteChannel(this.id)
    }

    public async edit(data:any){
        return await this.client.requester.editChannel(this.id,data)
    }

    public async fetchInvites(cache?:boolean){
        return await this.client.requester.getChannelInvites(this.id)
    }

    public async fetchWebhooks(){
        
    }

    public permissionFor(memberOrRole:any,checkAdmin?:boolean){

    }

    public async sendTyping(){
        await this.client.requester.TriggerTyping(this.id)
    }

    public async setDefaultAutoArchiveDuration(){

    }

    public async setName(name:string,reason:string){
        return await this.client.requester.editChannel(this.id,{name,reason})
    }
}

export interface MessageOptions {
    tts?: boolean;
    embeds?: Embed[];
    //TODO: change to allow mention object
    allowMentions?: any;
}

export interface FullMessageOptions extends MessageOptions {
    content?: string;
}

export interface CreateInviteOptions {
    temporary: boolean;
    unique: boolean;
    targetType: number;
    targetUserId: snowflake;
    targetApplicationId: snowflake;
    maxAge: number;
    maxUses: number;
}
