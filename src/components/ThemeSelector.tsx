import React from 'react';
import styled from 'styled-components';
import {Theme} from '../utils/dx/types';
import {THEMES} from '../utils/dx/dx-data';

const ThemeSelectorContainer = styled.div`
    display: flex;
    gap: 12px;
    border: 1px solid ${({theme}) => theme.colors.borders};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 4px;
`;

const ThemeOption = styled.button<{ $isActive: boolean }>`
    flex: 1;
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    background-color: ${({theme, $isActive}) => $isActive ? theme.colors.primary : 'transparent'};
    color: ${({theme, $isActive}) => $isActive ? '#FFFFFF' : theme.colors.textBody};
    cursor: pointer;
    font-weight: 500;
    transition: all 150ms ease-in-out;

    &:hover {
        background-color: ${({theme, $isActive}) => !$isActive && theme.colors.secondaryAction};
    }
`;

interface ThemeSelectorProps {
    setTheme: (theme: Theme) => void;
    currentThemeKey: Theme;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({setTheme, currentThemeKey}) => {
    return (
        <ThemeSelectorContainer>
            {THEMES.map(themeOption => (
                <ThemeOption
                    key={themeOption.value}
                    $isActive={currentThemeKey === themeOption.value}
                    onClick={() => setTheme(themeOption.value)}
                >
                    {themeOption.label}
                </ThemeOption>
            ))}
        </ThemeSelectorContainer>
    );
};

export default ThemeSelector;