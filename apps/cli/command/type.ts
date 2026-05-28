export interface CommandContext {
    exit: () => void | Promise<void>;
    args?: string;
}

export interface TypeCommand {
    name : string;
    description : string;
    value : string;
    action? : (ctx : CommandContext) => void;
}

