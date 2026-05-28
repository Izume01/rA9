export interface CommandContext {
    exit: () => void;
}

export interface TypeCommand {
    name : string;
    description : string;
    value : string;
    action? : (ctx : CommandContext) => void;
}

