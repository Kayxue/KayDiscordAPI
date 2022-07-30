import axios, { AxiosInstance, Method } from "axios";
import { FullMessageOptions } from "../DiscordTypes/GuildTextBasedChannel";
import { snowflake } from "../Types";
import { Client } from "./Client";

export class Requester {
    private baseURLRequester: AxiosInstance;
    private channelRequester: AxiosInstance;
    private guildRequester: AxiosInstance;
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
        this.guildRequester = axios.create({
            baseURL: "https://discord.com/api/v10/guilds",
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

    public async createGuild(data: any) {
        return await this.guildRequester
            .post("/", data)
            .then(({ data }) => data);
    }

    public async getGuild(guildId: string, withCounts?: boolean) {
        return await this.guildRequester
            .get(`${guildId}`, {
                params: {
                    with_counts: withCounts,
                },
            })
            .then(({ data }) => data);
    }

    public async getGuildPreview(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/preview`)
            .then(({ data }) => data);
    }

    public async editGuild(guildId: string, data: any) {
        const { reason } = data;
        return await this.guildRequester
            .patch(`${guildId}`, data, {
                headers: {
                    "X-Audit-Log-Reason": reason,
                },
            })
            .then(({ data }) => data);
    }

    public async deleteGuild(guildId: string) {
        return await this.guildRequester
            .delete(`${guildId}`)
            .then(({ data }) => data);
    }

    public async getGuildChannels(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/channels`)
            .then(({ data }) => data);
    }

    public async createGuildChannel(guildId: string, data: any) {
        return await this.guildRequester
            .post(`${guildId}/channels`, data)
            .then(({ data }) => data);
    }

    public async editGuildChannelPosition(guildId: string, data: any) {
        return await this.guildRequester
            .patch(`${guildId}/channels`, data)
            .then(({ data }) => data);
    }

    public async getGuildActiveThreads(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/threads/active`)
            .then(({ data }) => data);
    }

    public async getGuildMembers(
        guildId: string,
        limit?: number,
        after?: snowflake,
    ) {
        return await this.guildRequester
            .get(`${guildId}/members`, {
                params: {
                    limit,
                    after,
                },
            })
            .then(({ data }) => data);
    }

    public async searchGuildMember(
        guildId: string,
        query: string,
        limit: number,
    ) {
        return await this.guildRequester
            .get(`${guildId}/members/search`, {
                params: {
                    limit,
                    query,
                },
            })
            .then(({ data }) => data);
    }

    public async addGuildMember(guildId: string, userId: string, data: any) {
        return await this.guildRequester
            .put(`${guildId}/members/${userId}`, data)
            .then(({ data }) => data);
    }

    public async editGuildMember(
        guildId: string,
        userId: string | "me",
        data: any,
    ) {
        const { reason } = data;
        return await this.guildRequester
            .patch(
                `${guildId}/members/${userId === "me" ? "@me" : userId}`,
                data,
                {
                    headers: {
                        "X-Audit-Log-Reason": reason,
                    },
                },
            )
            .then(({ data }) => data);
    }

    public async addGuildMemberRole(
        guildId: string,
        userId: string,
        roleId: string,
        reason: string,
    ) {
        return await this.guildRequester
            .put(`${guildId}/members/${userId}/roles/${roleId}`, undefined, {
                headers: {
                    "X-Audit-Log-Reason": reason,
                },
            })
            .then(({ data }) => data);
    }

    public async removeGuildMemberRole(
        guildId: string,
        userId: string,
        roleId: string,
        reason: string,
    ) {
        return await this.guildRequester
            .delete(`${guildId}/members/${userId}/roles/${roleId}`, {
                headers: {
                    "X-Audit-Log-Reason": reason,
                },
            })
            .then(({ data }) => data);
    }

    public async removeGuildMember(
        guildId: string,
        userId: string,
        reason: string,
    ) {
        return await this.guildRequester
            .delete(`${guildId}/members/${userId}`, {
                headers: {
                    "X-Audit-Log-Reason": reason,
                },
            })
            .then(({ data }) => data);
    }

    public async getGuildBans(
        guildId: string,
        limit?: number,
        before?: string,
        after?: string,
    ) {
        return await this.guildRequester
            .get(`${guildId}/bans`, {
                params: {
                    limit,
                    before,
                    after,
                },
            })
            .then(({ data }) => data);
    }

    public async getGuildBan(guildId: string, userId: string) {
        return await this.guildRequester
            .get(`${guildId}/bans/${userId}`)
            .then(({ data }) => data);
    }

    public async banGuildMember(
        guildId: string,
        userId: string,
        deleteMessageDays?: number,
        reason?: string,
    ) {
        return await this.guildRequester
            .put(
                `${guildId}/bans/${userId}`,
                { delete_message_days: deleteMessageDays, reason },
                { headers: { "X-Audit-Log-Reason": reason } },
            )
            .then(({ data }) => data);
    }

    public async unbanGuildMember(
        guildId: string,
        userId: string,
        reason?: string,
    ) {
        return await this.guildRequester
            .delete(`${guildId}/bans/${userId}`, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async getGuildRoles(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/roles`)
            .then(({ data }) => data);
    }

    public async createGuildRole(guildId: string, data: any) {
        const { reason } = data;
        return await this.guildRequester
            .post(`${guildId}/roles`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async editGuildRolePosition(
        guildId: string,
        roleId: string,
        position?: number,
        reason?: string,
    ) {
        return await this.guildRequester
            .patch(
                `${guildId}/roles`,
                { id: roleId, position },
                {
                    headers: { "X-Audit-Log-Reason": reason },
                },
            )
            .then(({ data }) => data);
    }

    public async editGuildRole(guildId: string, roleId: string, data: any) {
        const { reason } = data;
        return await this.guildRequester
            .patch(`${guildId}/roles/${roleId}`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async editGuildMFALevel(guildId: string, mfaLevel: 0 | 1) {
        return await this.guildRequester
            .post(`${guildId}/roles/mfa`, { level: mfaLevel })
            .then(({ data }) => data);
    }

    public async deleteGuildRole(
        guildId: string,
        roleId: string,
        reason?: string,
    ) {
        return await this.guildRequester
            .delete(`${guildId}/roles/${roleId}`, {
                headers: {
                    "X-Audit-Log-Reason": reason,
                },
            })
            .then(({ data }) => data);
    }

    public async getPruneCount(
        guildId: string,
        days?: number,
        includeRoles?: string,
    ) {
        return await this.guildRequester
            .get(`${guildId}/prune`, {
                params: {
                    days,
                    include_roles: includeRoles,
                },
            })
            .then(({ data }) => data);
    }

    public async prune(
        guildId: string,
        days?: number,
        computePruneCount?: boolean,
        includeRoles?: string[],
        reason?: string,
    ) {
        return await this.guildRequester
            .post(
                `${guildId}/prune`,
                {
                    days,
                    compute_prune_count: computePruneCount,
                    include_roles: includeRoles,
                    reason,
                },
                {
                    headers: {
                        "X-Audit-Log-Reason": reason,
                    },
                },
            )
            .then(({ data }) => data);
    }

    public async getGuildVoiceRegions(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/regions`)
            .then(({ data }) => data);
    }

    public async getGuildInvites(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/invites`)
            .then(({ data }) => data);
    }

    public async getGuildIntegrations(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/intergrations`)
            .then(({ data }) => data);
    }

    public async deleteGuildIntegrations(
        guildId: string,
        integrationId: string,
        reason?: string,
    ) {
        return await this.guildRequester
            .delete(`${guildId}/intergrations/${integrationId}`, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async getGuildWidgetSettings(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/widget`)
            .then(({ data }) => data);
    }

    public async editGuildWidget(guildId: string, data: any) {
        const { reason } = data;
        return await this.guildRequester
            .patch(`${guildId}/widget`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async getGuildWidget(guildId: string) {
        return await this.guildRequester
            .get(`${guildId}/widget.json`)
            .then(({ data }) => data);
    }

    public async getGuildVanityURL(guildId:string){
        return await this.guildRequester
            .get(`${guildId}/vanity-url`)
            .then(({ data }) => data);
    }

    public async getGuildWidgetImage(guildId:string,style?:boolean){
        return await this.guildRequester
            .get(`${guildId}/widget.png`,{params:{style}})
            .then(({ data }) => data);
    }

    public async getGuildWelcomeScreen(guildId:string){
        return await this.guildRequester
            .get(`${guildId}/welcome-screen`)
            .then(({ data }) => data);
    }

    public async editGuildWelcomeScreen(guildId: string, data: any) {
        const { reason } = data;
        return await this.guildRequester
            .patch(`${guildId}/welcome-screen`, data, {
                headers: { "X-Audit-Log-Reason": reason },
            })
            .then(({ data }) => data);
    }

    public async editVoiceState(guildId: string, data: any,userId?:string|"me") {
        return await this.guildRequester
            .patch(`${guildId}/voice-states/${userId === "me"?"@me":userId}`, data)
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
