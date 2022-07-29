import moment, { Moment } from "moment-timezone";
import { Client } from "../../Clients/Client";
import { channelTypes } from "../../Types";
import { DiscordSnowflake } from "@sapphire/snowflake";

export default class BaseChannel {
    public client: Client;
    public createAt: Moment;
    public id: string;
    public type: channelTypes;
    protected guildId: string;

    public constructor(client: Client, data: any) {
        this.client = client;
        this.id = data.id;
        this.type = data.type;
        this.createAt = moment(DiscordSnowflake.timestampFrom(this.id));
    }

    public get url() {
        return `https://discord.com/channels/${
            [channelTypes.DM, channelTypes.GROUP_DM].includes(this.type)
                ? "@me"
                : this.guildId
        }/${this.id}`;
    }

    public async delete() {
        return await this.client.requester.deleteChannel(this.id);
    }

    public async fetch() {
        return await this.client.requester.getChannel(this.id);
    }
}
