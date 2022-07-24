import {Client} from "../src/index"
import { GatewayIntents } from "../src/Types";
import { token } from "./Config";

const websocketClient = new Client({
    intents: [GatewayIntents.GUILDS,GatewayIntents.GUILD_BANS] as any,
    token: token,
});
websocketClient.connect();

websocketClient.on("ready",() => {
    console.log("bot is ready")
})

websocketClient.on("guildCreate",(guild) => {
    console.log("www")
})



