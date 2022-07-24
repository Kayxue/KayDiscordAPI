import { ClientEvents } from "../Types";
import WebSocketManager from "./WebSocketManager";

export class Client extends WebSocketManager{
    public on<K extends keyof ClientEvents>(event:K,listener:(...args:ClientEvents[K]) => any): any{
        super.on(event,listener)
    }
}