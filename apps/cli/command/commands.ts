import type {TypeCommand} from "./type";

export const COMMANDS : TypeCommand[] = [
    {
        name : "new", 
        description : "Create a new conversation",
        value : "/new"
    },
    {
        name : "exit",
        description : "Exit the application",
        value : "/exit",
        action : (ctx) => {
            ctx.exit();
        }
    }
]