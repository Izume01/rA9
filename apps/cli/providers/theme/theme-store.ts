import {create} from 'zustand';
import { Theme, ThemeColors } from '../../theme';
import { getInitialTheme, saveThemeToConfig } from '.';

interface ThemeState {
    colorTheme: ThemeColors;
    currentThemeName: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    currentThemeName : getInitialTheme(),
    colorTheme : getInitialTheme().colors,
    setTheme : (theme : Theme) => {
        set({
            currentThemeName : theme,
            colorTheme : theme.colors,
        });
        saveThemeToConfig(theme.name);
    }
}))

export const useTheme =  () => {
    const { colorTheme , currentThemeName , setTheme } = useThemeStore();
    return { colorTheme , currentThemeName , setTheme };
}