import axios, { AxiosInstance } from "axios";
import { snowflake } from "../Types";
import { Client } from "./Client";

export class Requester {
    private axiosInstance: AxiosInstance;
    private channelRequester: AxiosInstance;
    public client: Client;

    public constructor(client: Client) {
        this.axiosInstance = axios.create({
            baseURL: "https://discord.com/api/v10",
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        });
        this.channelRequester = axios.create({
            baseURL: "https://discord.com/api/v10/channels",
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        });
        this.client = client;
    }

    public async crosspostMessage(channelId: string, messageId: string) {
        return await this.channelRequester.post(
            `/${channelId}/messages/${messageId}/crosspost`,
        );
    }

    public async react(channelId: string, messageId: string, emoji: string) {
        return await this.channelRequester.put(
            `/${channelId}/messages/${messageId}/reactions/${emoji}/@me`,
        );
    }

    public async removeReaction(
        channelId: string,
        messageId: string,
        emoji: string,
        userId: string | "me",
    ) {
        return await this.channelRequester.delete(
            `/${channelId}/messages/${messageId}/reactions/${emoji}/${
                userId === "me" ? "@me" : userId
            }`,
        );
    }

    public async getReactions(
        channelId: string,
        messageId: string,
        emoji: string,
        after?: snowflake,
        limit?: number,
    ) {
        return await this.channelRequester.get(
            `/${channelId}/messages/${messageId}/reactions/${emoji}`,
            {
                params: {
                    after,
                    limit,
                },
            },
        );
    }

    public async removeAllReactions(
        channelId: string,
        messageId: string,
        emoji?: string,
    ) {
        return await this.channelRequester.delete(
            `/${channelId}/messages/${messageId}/reactions${
                emoji ? `/${emoji}` : ""
            }`,
        );
    }

    public async deleteMessage(channelId: string, messageId: string) {
        return await this.channelRequester.delete(
            `/${channelId}/messages/${messageId}`,
        );
    }

    public async getMessage(channelId: string, messageId: string) {
        return await this.channelRequester.get(
            `/${channelId}/messages/${messageId}`,
        );
    }
}
