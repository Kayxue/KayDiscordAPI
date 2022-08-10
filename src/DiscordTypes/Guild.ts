import { DiscordSnowflake } from "@sapphire/snowflake";
import moment, { Moment } from "moment-timezone";
import { Client } from "../Clients/Client";
import { DefaultMessageNotificationLevel, ExplicitContentFilterLevel, GuildNSFWLevel, MFALevel, PremiumTier, snowflake, VerificationLevel } from "../Types";

export class Guild{
    public id:snowflake
    public name:string
    public icon?:string
    public splash?:string
    public discoverySplash?:string
    public ownerId:string
    public region?:string
    public afkChannelId?:snowflake
    public afkTimeout:number
    public widgetEnabled?:boolean
    public widgetChannelId?:snowflake
    public verificationLevel:VerificationLevel
    public defaultMessageNotificationLevel:DefaultMessageNotificationLevel
    public explicitContentFilterLevel:ExplicitContentFilterLevel
    //TODO: change to role object
    public roles:any[]
    //TODO: change to emoji object
    public emojis:any[]
    public features:string[]
    public mfaLevel:MFALevel
    public applicationId?:snowflake
    public systemChannelId?:snowflake
    public systemChannelFlags:number
    public rulesChannelId?:snowflake
    public maxPresences?:number
    public maxMembers?:number
    public vanityURLCode?:string
    public description?:string
    public banner?:string
    public premiumTier?:PremiumTier
    public premiumSubscriptionCount?:number
    public preferredLocale:string
    public publicUpdatesChannelId?:snowflake
    public maxVideoChannelUsers?:number
    public approximateMemberCount?:number
    public approximatePresenceCount?:number
    //TODO: change to wolcome screen object
    public welcomeScreen?:any
    public nsfwLevel:GuildNSFWLevel
    //TODO: change to sticker object
    public stickers:any[]
    public premiumProgressBarEnabled:boolean
    public createdAt:Moment
    public client:Client

    public constructor(client:Client,data:any){
        this.id=data.id
        this.name=data.name
        this.icon=data.icon
        this.splash=data.splash
        this.discoverySplash=data.discovery_splash
        this.ownerId=data.owner_id
        this.region=data.region
        this.afkChannelId=data.afk_channel_id
        this.afkTimeout=data.afk_timeout
        this.widgetEnabled=data.widget_enabled
        this.widgetChannelId=data.widget_channel_id
        this.verificationLevel=data.verification_level
        this.defaultMessageNotificationLevel=data.default_message_notification_level
        this.explicitContentFilterLevel=data.explicit_content_filter
        this.roles=data.roles
        this.emojis=data.emojis
        this.features=data.features
        this.mfaLevel=data.mfa_level
        this.applicationId=data.application_id
        this.systemChannelId=data.system_channel_id
        this.systemChannelFlags=data.system_channel_flags
        this.rulesChannelId=data.rules_channel_id
        this.maxPresences=data.max_presences
        this.maxMembers=data.max_members
        this.vanityURLCode=data.vanity_url_code
        this.description=data.description
        this.banner=data.banner
        this.premiumTier=data.premium_tier
        this.premiumSubscriptionCount=data.premium_subscription_count
        this.preferredLocale=data.preferred_locale
        this.publicUpdatesChannelId=data.public_updates_channel_id
        this.maxVideoChannelUsers=data.max_video_channel_users
        this.approximateMemberCount=data.approximate_member_count
        this.approximatePresenceCount=data.approximate_presence_count
        this.welcomeScreen=data.welcome_sceen
        this.nsfwLevel=data.nsfw_level
        this.stickers=data.stickers
        this.premiumProgressBarEnabled=data.premium_progress_bar_enabled
        this.client=client
        this.createdAt=moment(DiscordSnowflake.timestampFrom(this.id))
    }

    public bannerURL(){
        return this.banner
    }

    public createTemplate(name:string,description?:string){
        
    }

    public async delete(){
        return await this.client.requester.deleteGuild(this.id)
    }

    public async discoverySplashURL(){
        return this.discoverySplash
    }

    public async edit(data:any,reason?:string){
        return await this.client.requester.editChannel(this.id,{...data,reason:reason??data.reason})
    }

    public async editWelcomeScreen(data:any,reason?:string){
        return await this.client.requester.editGuildWelcomeScreen(data,{...data,reason:reason??data.reason})
    }

    public async fetch(withCounts?:boolean){
        return await this.client.requester.getGuild(this.id,withCounts)
    }

    public async fetchAuditLogs(){
        
    }

    public async fetchIntegrations(){
        return await this.client.requester.getGuildIntegrations(this.id)
    }

    public async fetchOwner(){
        
    }

    public async fetchPreview(){
        return await this.client.requester.getGuildPreview(this.id)
    }

    public async fetchVanityData(){

    }

    public async fetchWebhooks(){

    }
}