import { IDecoratorCommandInfo } from "../Interfaces";

export function command(name?: IDecoratorCommandInfo);
export function command(name?: string);
export function command(nameOrObj?: string | IDecoratorCommandInfo) {
    return function (
        target: any,
        functionName: string,
        descriptor: PropertyDescriptor,
    ) {
        if (typeof nameOrObj === "string") {
            const funcName = `cmd${nameOrObj ?? functionName}`;
            target[funcName] = function () {
                return {
                    name: nameOrObj ?? functionName,
                    run: descriptor.value,
                };
            };
        }else{
            const funcName = `cmd${nameOrObj?.name ?? functionName}`;
            target[funcName] = function () {
                return {
                    name: nameOrObj?.name ?? functionName,
                    description:nameOrObj?.description,
                    aliases:nameOrObj?.aliases,
                    usage:nameOrObj?.usage,
                    run: descriptor.value,
                };
            };
        }
    };
}

export function on(target: any, name: string, descriptor: PropertyDescriptor) {
    const funcName = `onEvent${name}`;
    target[funcName] = function () {
        return {
            type: "on",
            event: name,
            run: descriptor.value,
        };
    };
}

export function once(
    target: any,
    name: string,
    descriptor: PropertyDescriptor,
) {
    const funcName = `onEvent${name}`;
    target[funcName] = function () {
        return {
            type: "once",
            event: name,
            run: descriptor.value,
        };
    };
}
