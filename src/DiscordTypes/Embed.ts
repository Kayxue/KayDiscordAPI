import moment, { Moment } from "moment-timezone";

export class Embed {
    public title?: string;
    public type?: string;
    public description?: string;
    public url?: string;
    public timestamp?: Moment;
    public color?: number;
    public footer?: IFooter;
    public image?: IImage;
    public thumbnail?: IThumbnail;
    public video?: IVideo;
    public provider?: IProvider;
    public author?: IAuthor;
    public fields?: IEmbedField[] = [];

    public constructor(embedBase?: Embed | any) {
        if (embedBase) {
            this.author = embedBase.author;
            this.color = embedBase.color;
            this.description = embedBase.description;
            this.fields = embedBase.fields ? [...embedBase.fields] : undefined;
            this.footer = embedBase.footer;
            this.image = embedBase.image;
            this.provider = embedBase.provider;
            this.thumbnail = embedBase.thumbnail;
            this.timestamp = embedBase.timestamp?moment(embedBase.timestamp):null;
            this.title = embedBase.title;
            this.type = embedBase.type;
            this.url = embedBase.url;
            this.video = embedBase.video;
        }
    }

    public setTitle(title: string) {
        this.title = title;
        return this;
    }

    public setColor(color: number | `#${string}`) {
        if(typeof color === "number"){
            this.color = color
        }else{
            this.color = parseInt(color.slice(1), 16)
        }
        return this
    }

    public setDescription(description: string) {
        this.description = description;
        return this;
    }

    public setUrl(url: string) {
        this.url = url;
    }

    public setTimestamp(timestamp: any) {}

    public setFooter(Footer: IFooter): this;
    public setFooter(text: string, icon_url?: string): this;
    public setFooter(textOrFooterObj: string | IFooter, icon_url?: string) {
        if (typeof textOrFooterObj === "string") {
            this.footer = {
                text: textOrFooterObj,
                icon_url,
            };
        } else {
            this.footer = textOrFooterObj;
        }
        return this;
    }

    public setImage(urlOrImageObj: string | IImage) {
        if (typeof urlOrImageObj === "string") {
            this.image = {
                url: urlOrImageObj,
            };
        } else {
            this.image = urlOrImageObj;
        }
    }

    public setThumbnail(urlOrThumbnailObj: string | IThumbnail) {
        if (typeof urlOrThumbnailObj === "string") {
            this.thumbnail = {
                url: urlOrThumbnailObj,
            };
        } else {
            this.thumbnail = this.thumbnail;
        }
    }

    public setVideo(url: string) {
        this.video = {
            url,
        };
        return this
    }

    public setAuthor(
        nameOrAuthorObj: string | IAuthor,
        url?: string,
        icon_url?: string,
    ) {
        if (typeof nameOrAuthorObj === "string") {
            this.author = {
                name: nameOrAuthorObj,
                url,
                icon_url,
            };
        } else {
            this.author = nameOrAuthorObj;
        }
    }

    public addField(field: IEmbedField):this;
    public addField(name: string, value: string, inline?: boolean):this;
    public addField(
        nameOrFieldObj: string | IEmbedField,
        value?: string,
        inline?: boolean,
    ) {
        if (typeof nameOrFieldObj === "string") {
            this.fields.push({
                name: nameOrFieldObj,
                value,
                inline,
            });
        } else {
            this.fields.push(nameOrFieldObj);
        }
        return this;
    }

    public addFields(...fields: IEmbedField[] | [IEmbedField[]]) {
        if (Array.isArray(fields[0])) {
            this.fields = [...this.fields, ...fields[0]];
        } else {
            this.fields = [...this.fields, ...(fields as IEmbedField[])];
        }
        return this;
    }

    public toJSON(){
        return {
            title:this.title,
            type:this.type,
            description:this.description,
            url:this.url,
            timestamp:this.timestamp?.unix(),
            color:this.color,
            footer:this.footer,
            image:this.image,
            thumbnail:this.thumbnail,
            video:this.video,
            provider:this.provider,
            author:this.author,
            fields:this.fields
        }
    }
}

export interface IFooter {
    text: string;
    icon_url: string;
}

export interface IImage {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface IThumbnail {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface IVideo {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}

export interface IProvider {
    name?: string;
    url?: string;
}

export interface IAuthor {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}

export interface IEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}
