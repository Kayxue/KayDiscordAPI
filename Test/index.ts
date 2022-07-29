import { Embed } from "../src/DiscordTypes/Embed";
import { GuildTextBasedChannel } from "../src/DiscordTypes/GuildTextBasedChannel";
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

client.on("messageCreate",async (message) => {
    const embed=new Embed()
    .setTitle("w")
    .setColor(`#FF0000`)
    .setDescription("www")
    .setVideo("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .setFooter("www")
    .addField("w","k",false)
    .addField({
        name:"www",
        value:"w",
        inline:true
    })
    .addFields({name:"haiya",value:"haiya",inline:false},{name:"haiya2",value:"haiya2",inline:true})
    .addFields([{name:"haiya",value:"haiya",inline:true},{name:"haiya2",value:"haiya2",inline:false}])
    return (message.channel as GuildTextBasedChannel).send(embed)
})


client.connect();




