import axios, { AxiosInstance, Method } from "axios";
import { FullMessageOptions } from "../DiscordTypes/GuildTextBasedChannel";
import { snowflake } from "../Types";
import { Client } from "./Client";

export class Requester {
    private baseURLRequester: AxiosInstance;
    private channelRequester: AxiosInstance;
    public client: Client;

    public constructor(client: Client) {
        this.baseURLRequester = axios.create({
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
        return await this.channelRequester
            .put(`/${channelId}/messages/${messageId}/reactions/${emoji}/@me`)
            .then(({ data }) => data);
    }

    public async removeReaction(
        channelId: string,
        messageId: string,
        emoji: string,
        userId: string | "me",
    ) {
        return await this.channelRequester
            .delete(
                `/${channelId}/messages/${messageId}/reactions/${emoji}/${
                    userId === "me" ? "@me" : userId
                }`,
            )
            .then(({ data }) => data);
    }

    public async getReactions(
        channelId: string,
        messageId: string,
        emoji: string,
        after?: snowflake,
        limit?: number,
    ) {
        return await this.channelRequester
            .get(`/${channelId}/messages/${messageId}/reactions/${emoji}`, {
                params: {
                    after,
                    limit,
                },
            })
            .then(({ data }) => data);
    }

    public async removeAllReactions(
        channelId: string,
        messageId: string,
        emoji?: string,
    ) {
        return await this.channelRequester
            .delete(
                `/${channelId}/messages/${messageId}/reactions${
                    emoji ? `/${emoji}` : ""
                }`,
            )
            .then(({ data }) => data);
    }

    public async deleteMessage(channelId: string, messageId: string) {
        return await this.channelRequester
            .delete(`/${channelId}/messages/${messageId}`)
            .then(({ data }) => data);
    }

    public async getMessage(channelId: string, messageId: string) {
        return await this.channelRequester
            .get(`/${channelId}/messages/${messageId}`)
            .then(({ data }) => data);
    }

    public async getMessages(channelId: string, limit?: number) {
        return await this.channelRequester
            .get(`${channelId}/messages`, {
                params: {
                    limit,
                },
            })
            .then(({ data }) => data);
    }

    public async getChannel(channelId: string) {
        return await this.channelRequester
            .get(`/${channelId}`)
            .then(({ data }) => data);
    }

    public async deleteChannel(channelId: string) {
        return await this.channelRequester
            .delete(`/${channelId}`)
            .then(({ data }) => data);
    }

    public async sendMessage(
        channelId: string,
        messageOptions: FullMessageOptions,
    ) {
        const toSend: any = {
            ...messageOptions,
            allow_mentions: messageOptions.allowMentions,
        };
        if (toSend.embeds) {
            toSend.embeds = toSend.embeds.map((e) => e.toJSON());
        }
        return await this.channelRequester
            .post(`${channelId}/messages`, toSend)
            .then(({ data }) => data);
    }

    public async bulkDelete(channelId: string, count: number) {
        const messages = await this.getMessages(channelId, count);
        const ids = messages.map((e: any) => e.id);
        return await this.channelRequester
            .post(`${channelId}/messages/bulk-delete`, {
                messages: ids,
            })
            .then(({ data }) => data);
    }

    public async editChannel(channelId: string, data: any) {
        const { reason } = data;
        return await this.channelRequester
            .patch(`${channelId}`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async editMessage(channelId: string, messageId: string, data: any) {
        const { reason } = data;
        return this.channelRequester.delete(
            `${channelId}/messages/${messageId}`,
            {
                headers: { "X-Audit-Log-Reason": reason },
            },
        );
    }

    public async overwriteChannelPermission(
        channelId: string,
        overwriteId: snowflake,
        data: any,
    ) {
        const { reason } = data;
        return await this.channelRequester
            .put(`${channelId}/permissions/${overwriteId}`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async getChannelInvites(channelId: string) {
        return await this.channelRequester
            .get(`${channelId}/invites`)
            .then(({ data }) => data);
    }

    public async createChannelInvite(channelId: string, data: any) {
        const { reason } = data;
        return await this.channelRequester
            .post(`${channelId}/invites`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async deleteChannelPermissionOverwrite(
        channelId: string,
        overwriteId: snowflake,
        data: any,
    ) {
        const { reason } = data;
        return await this.channelRequester
            .delete(`${channelId}/permissions/${overwriteId}`, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async followNewsChannel(
        channelId: string,
        webhook_channel_id: snowflake,
    ) {
        return await this.channelRequester
            .post(`${channelId}/followers`, { webhook_channel_id })
            .then(({ data }) => data);
    }

    public async TriggerTyping(channelId: string) {
        return await this.channelRequester
            .post(`${channelId}/typing`)
            .then(({ data }) => data);
    }

    public async getPinedMessages(channelId: string) {
        return await this.channelRequester
            .post(`${channelId}/pins`)
            .then(({ data }) => data);
    }

    public async pinMessage(channelId: string, messageId: string, data: any) {
        const { reason } = data;
        return await this.channelRequester
            .put(`${channelId}/pins/${messageId}`, undefined, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async unpinMessage(channelId: string, messageId: string, data: any) {
        const { reason } = data;
        return await this.channelRequester
            .delete(`${channelId}/pins/${messageId}`, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async DMAddRecipient(channelId: string, userId: string, data: any) {
        const { reason } = data;
        return this.channelRequester
            .post(`${channelId}/recipients/${userId}`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async DMDeleteRecipient(
        channelId: string,
        userId: string,
        data: any,
    ) {
        const { reason } = data;
        return this.channelRequester
            .delete(`${channelId}/recipients/${userId}`, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async StartThreadFromMessage(
        channelId: string,
        messageId: string,
        data: any,
    ) {
        const { reason } = data;
        return this.channelRequester
            .post(`${channelId}/messages/${messageId}/threads`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async StartThread(channelId: string, data: any) {
        const { reason } = data;
        return this.channelRequester
            .post(`${channelId}/threads`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async StartThreadFromForum(channelId: string, data: any) {
        const { reason } = data;
        return this.channelRequester
            .post(`${channelId}/threads`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async addThreadMember(channelId: string, userId: string | "me") {
        return await this.channelRequester
            .put(
                `${channelId}/thread-members/${
                    userId === "me" ? "@me" : userId
                }`,
            )
            .then(({ data }) => data);
    }

    public async removeThreadMember(channelId: string, userId: string | "me") {
        return await this.channelRequester
            .delete(
                `${channelId}/thread-members/${
                    userId === "me" ? "@me" : userId
                }`,
            )
            .then(({ data }) => data);
    }

    public async getThreadMember(channelId: string, userId: string) {
        return await this.channelRequester
            .get(`${channelId}/thread-members/${userId}`)
            .then(({ data }) => data);
    }

    public async getThreadMemberList(channelId: string) {
        return await this.channelRequester
            .get(`${channelId}/thread-members`)
            .then(({ data }) => data);
    }

    public async getAchivedThreadList(
        type: "public" | "private",
        channelId: string,
        before?: number,
        limit?: number,
    ) {
        return await this.channelRequester
            .get(`${channelId}/threads/archived/${type}`)
            .then(({ data }) => data);
    }

    public async getJoinedPrivateThreadList(
        channelId: string,
        before?: snowflake,
        limit?: number,
    ) {
        return await this.channelRequester
            .get(`${channelId}/users/@me/threads/archived/private`)
            .then(({ data }) => data);
    }

    public async request(
        route: string,
        method: Method,
        data?: any,
        headers?: any,
    ) {
        return await this.baseURLRequester({
            method,
            url: route,
            data,
            headers,
        }).then(({ data }) => data);
    }
}
