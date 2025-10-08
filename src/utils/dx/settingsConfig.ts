import React from 'react';
import {CURRENCIES, DEFAULT_CURRENCY, DEFAULT_THEME, MODAL_DATA, THEMES} from './dx-data';
import {Settings} from './types';
import ThemeSelector from '../../components/ThemeSelector';
import CurrencySelector from '../../components/CurrencySelector';

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

const currencyConfig: SettingConfig<'currency'> = {
    key: 'currency',
    label: MODAL_DATA.general.currencyLabel,
    defaultValue: DEFAULT_CURRENCY,
    options: CURRENCIES,
    component: CurrencySelector,
};

export const settingsConfig = {
    theme: themeConfig,
    currency: currencyConfig,
};

export const settingsConfigArray = Object.values(settingsConfig);