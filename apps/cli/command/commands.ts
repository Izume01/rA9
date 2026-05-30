import type {TypeCommand} from "./type";
import { toast } from "../providers/toast";

export const COMMANDS : TypeCommand[] = [
    {
        name : "new",
        description : "Create a new conversation",
        value : "/new",
        action : () => {
            toast.success("New conversation started!");
        }
    },
    {
        name : "exit",
        description : "Exit the application",
        value : "/exit",
        action : (ctx) => {
            toast.info("Exiting application...");
            setTimeout(() => {
                ctx.exit();
            }, 1000);
        }
    },
    {
        name : "help",
        description : "Show this help message",
        value : "/help",
        action : () => {
            toast.info("Help: Type / followed by a command name to execute actions.", 4000);
        }
    },
    {
        name : "models",
        description : "List available models",
        value : "/models",
        action : () => {
            toast.info("Models loaded: Gemini 1.5 Pro, Gemini 1.5 Flash.", 4000);
        }
    },
    {
        name : "logout",
        description : "Logout from your account",
        value : "/logout",
        action : (ctx) => {
            toast.success("Logged out successfully.");
            setTimeout(() => {
                ctx.exit();
            }, 1000);
        }
    },
    {
        name : "agent",
        description : "Start an agent with a specified goal",
        value : "/agent",
        action : () => {
            toast.info("Initializing agent with specified goal...");
        }
    },
    {
        name : "sessions",
        description : "List all sessions",
        value : "/sessions",
        action : () => {
            toast.info("Found 3 active workspace sessions.");
        }
    },
    {
        name : "theme",
        description : "Change the terminal theme",
        value : "/theme",
        action : () => {
            toast.success("Theme changed to Charcoal & Turquoise!");
        }
    },
    {
        name : "usage",
        description : "Show API usage statistics",
        value : "/usage",
        action : () => {
            toast.success("Usage: 1,420 / 10,000 requests used (14.2%).");
        }
    }
]
