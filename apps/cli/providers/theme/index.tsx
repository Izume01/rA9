import { mkdir , readFileSync , writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { createContext , useContext , useEffect , useState } from "react";
import type { ReactNode } from "react";
import {DEFAULT_THEME , THEMES} from "../../theme";
import { ThemeColors , Theme } from "../../theme";

const configDir = join(homedir() , ".ra9");
const themeConfigPath = join(configDir , "config.json");

type ThemeConfigFile = {
    themeName: string;
}

