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
    },
    {
        name : "help",
        description : "Show this help message",
        value : "/help"
    },
    {
        name : "models",
        description : "List available models",
        value : "/models"
    },
    {
        name : "logout",
        description : "Logout from your account",
        value : "/logout",
        action : (ctx) => {
            // Implement logout logic here
            console.log("Logging out...");
            ctx.exit();
        }
    },
    {
        name : "agent",
        description : "Start an agent with a specified goal",
        value : "/agent",
        action : (ctx) => {
            console.log("Starting agent...");
            // Implement agent logic here
        }
    },
    {
        name : "sessions",
        description : "List all sessions",
        value : "/sessions"
    },
    {
        name : "theme",
        description : "Change the terminal theme",
        value : "/theme"
    },
    {
        name : "usage",
        description : "Show API usage statistics",
        value : "/usage"
    }
]