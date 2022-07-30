import { Client } from "../../Clients/Client";
import { CommandClient } from "../../Clients/CommandsClient";
import { ICategory } from "../Interfaces";

export class Cog<T extends Client> {
    public client: T;
    public cogInfo: ICategory;

    public constructor(client: T, cogInfo?: ICategory) {
        this.client = client;
        this.cogInfo = cogInfo;
    }
}
