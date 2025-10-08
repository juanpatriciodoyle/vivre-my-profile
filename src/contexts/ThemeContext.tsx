import React, {createContext, ReactNode, useCallback, useMemo} from 'react';
import {ThemeProvider} from 'styled-components';
import {themes, ThemeType} from '../styles/theme';
import {useSettings} from '../utils/dx/settingsContext';
import {Theme} from '../utils/dx/types';

interface ThemeContextType {
    mode: Theme;
    toggleTheme: () => void;
    theme: ThemeType;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface CustomThemeProviderProps {
    children: ReactNode;
}

export const CustomThemeProvider = ({children}: CustomThemeProviderProps) => {
    const {settings, setSettings} = useSettings();
    const themeMode: Theme = settings.theme;
    const theme: ThemeType = useMemo(() => themes[themeMode], [themeMode]);

    const toggleTheme = useCallback(() => {
        setSettings({theme: themeMode === 'light' ? 'dark' : 'light'});
    }, [themeMode, setSettings]);

    const contextValue = useMemo(() => ({
        mode: themeMode,
        toggleTheme,
        theme,
    }), [themeMode, theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};