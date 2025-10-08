import React from 'react';
import {COUNTRIES, DEFAULT_COUNTRY, DEFAULT_THEME, MODAL_DATA, THEMES} from './dx-data';
import {Settings} from './types';
import ThemeSelector from '../../components/ThemeSelector';

export interface SettingConfig<K extends keyof Settings> {
    key: K;
    label: string;
    defaultValue: Settings[K];
    options: ReadonlyArray<{ value: Settings[K]; label: string }>;
    component?: React.ElementType;
}

const themeConfig: SettingConfig<'theme'> = {
    key: 'theme',
    label: MODAL_DATA.general.themeLabel,
    defaultValue: DEFAULT_THEME,
    options: THEMES,
    component: ThemeSelector,
};

const countryConfig: SettingConfig<'country'> = {
    key: 'country',
    label: MODAL_DATA.general.countryLabel,
    defaultValue: DEFAULT_COUNTRY,
    options: COUNTRIES,
};

export const settingsConfig = {
    theme: themeConfig,
    country: countryConfig,
};

export const settingsConfigArray = Object.values(settingsConfig);