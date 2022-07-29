export function command(name?: string) {
    return function (
        target: any,
        functionName: string,
        descriptor: PropertyDescriptor,
    ) {
        const funcName = `cmd${name ?? functionName}`;
        target[funcName] = function () {
            return {
                name: name ?? functionName,
                run: descriptor.value,
            };
        };
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
