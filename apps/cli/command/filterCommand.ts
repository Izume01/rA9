import type { TypeCommand } from "./type";
import { COMMANDS } from "./commands";

export const getFilteredCommands = (input : string) : TypeCommand[] => {
    if (!input.startsWith("/")) return [];

    const searchTerm = input.toLowerCase();
    const filtered = COMMANDS.filter(cmd => cmd.value.startsWith(searchTerm));
    return filtered;
}