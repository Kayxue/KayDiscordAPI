import EventEmitter from "events";
import WebSocket, { RawData } from "ws";
import { Message } from "../DiscordTypes/Message";
import { ClientInitOptions, GatewayIntents, GatewayOpCode } from "../Types";

export default abstract class WebSocketManager extends EventEmitter {
    protected ws: WebSocket;
    public token: string;
    public intents: GatewayIntents[];
    public intentsNum: number;
    private heartBeatInteval: number;
    private heartBeatIntervalFunc: NodeJS.Timer;
    private s: number = null;
    private onlined = false;

    public constructor(options: ClientInitOptions) {
        super();
        this.token = options.token;
        this.intents = options.intents;
        this.intentsNum = options.intents.reduce((sum, now) => sum | now, 0);
    }

    public connect(token?: string) {
        this.token ??= token;
        if (!this.token) throw new Error("No token provided!");
        this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        this.ws.on("open", this.onOpen.bind(this));
        this.ws.on("message", this.onMessage.bind(this));
    }

    private onOpen() {
        console.log("Connected to WebSocket!");
    }

    private onMessage(rawdata: RawData, isBinary: boolean) {
        const data = JSON.parse(rawdata.toString());
        // console.log(data);
        switch (data.op) {
            case GatewayOpCode.HELLO:
                this.heartBeatInteval ??= data.d.heartbeat_interval;
                this.heartBeatIntervalFunc ??= setInterval(() => {
                    this.ws.send(
                        JSON.stringify({
                            op: GatewayOpCode.HEARTBEAT,
                            d: this.s,
                        }),
                    );
                }, this.heartBeatInteval);
                if (!this.onlined) {
                    this.ws.send(
                        JSON.stringify({
                            op: GatewayOpCode.IDENTIFY,
                            d: {
                                token: this.token,
                                intents: this.intentsNum,
                                properties: {
                                    os: "linux",
                                    browser: "haiyaa",
                                    device: "haiyaa",
                                },
                            },
                        }),
                    );
                    this.onlined = true;
                }
                break;
            case GatewayOpCode.DISPATCH:
                this.handleDispatch(data);
                break;
        }
        if (data.s !== null) this.s = data.s;
    }

    protected abstract handleDispatch(data: any);

    protected setS(value: number) {
        this.s = value;
    }
}
