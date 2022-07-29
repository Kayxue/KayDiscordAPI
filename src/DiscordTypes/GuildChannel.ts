import { Client } from "../Clients/Client";
import BaseChannel from "./Base/BaseChannel";

export class GuildChannel extends BaseChannel {
    public name: string;
    public position?: number;
    //TODO: change to guild category
    public parent_id?: string;
    //TODO: change to permission overwrite type
    public permissionOverwrites?: any;
    public permissionSynced: boolean;

    public constructor(client: Client, data: any) {
        super(client, data);
        this.guildId = data.guild_id;
        this.name = data.name;
        this.position = data.position;
        this.permissionOverwrites = data.permission_overwrites;
    }
}
