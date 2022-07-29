import { CommandClient } from "../src/Clients/CommandsClient";
import { Embed } from "../src/DiscordTypes/Embed";
import { GuildTextBasedChannel } from "../src/DiscordTypes/GuildTextBasedChannel";
import {Client} from "../src/index"
import { GatewayIntents } from "../src/Types";
import { token } from "./Config";

const client = new CommandClient({
    intents: Object.values(GatewayIntents) as any,
    token: token,
    prefix:["t!"],
    directory:"C:/Users/Kay/Desktop/KayDiscordAPI/Test/Commands"
});

client.connect();




