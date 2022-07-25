import {Client} from "../src/index"
import { GatewayIntents } from "../src/Types";
import { token } from "./Config";

const client = new Client({
    intents: Object.values(GatewayIntents) as any,
    token: token,
});

client.on("ready",() => {
    console.log("bot is ready")
})

client.on("guildCreate",(guild) => {
    console.log("www")
})

client.on("messageCreate",async (message) => {
    return message.delete()
})

client.connect();




