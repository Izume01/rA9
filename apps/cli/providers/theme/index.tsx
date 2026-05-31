import { mkdir , readFileSync , writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import {DEFAULT_THEME , THEMES} from "../../theme";
import { ThemeColors , Theme } from "../../theme";

const configDir = join(homedir() , ".ra9");
const themeConfigPath = join(configDir , "config.json");

type ThemeConfigFile = {
    themeName: string;
}

export function getInitialTheme() : Theme {
    try {
        const configContent = readFileSync(themeConfigPath , "utf-8"); 
        const themeConfig = JSON.parse(configContent) as ThemeConfigFile;
        const foundTheme = THEMES.find(t => t.name === themeConfig.themeName);
        return foundTheme || DEFAULT_THEME;
    } catch (err) {
        return DEFAULT_THEME;
    }
} 

export function saveThemeToConfig(themeName: string) {
    try {
        mkdir(configDir , {recursive : true} , (err) => {
            if (err) {
                console.error("Failed to create config directory:" , err);
                return;
            }
            const configData : ThemeConfigFile = { themeName };
            writeFileSync(themeConfigPath , JSON.stringify(configData) , "utf-8");
        })
    } catch (error) {
        console.error("Failed to save theme config:" , error);
    }
}

