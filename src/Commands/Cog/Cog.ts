import { Client } from "../../Clients/Client";
import { CommandClient } from "../../Clients/CommandsClient";

export class Cog<T extends Client> {
    public client: T;

    public constructor(client: T) {
        this.client = client;
    }
}
