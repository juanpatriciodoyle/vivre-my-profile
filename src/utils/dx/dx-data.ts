import {Currency, Theme} from './types';

export const THEMES: { value: Theme; label: string }[] = [
    {value: 'light', label: 'Light'},
    {value: 'dark', label: 'Dark'},
];

export const CURRENCIES: { value: Currency; label: string }[] = [
    {value: 'GBP', label: 'GBP (£)'},
    {value: 'EUR', label: 'EUR (€)'},
];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
    EUR: '€',
    GBP: '£',
};

export const DEFAULT_THEME: Theme = 'light';
export const DEFAULT_CURRENCY: Currency = 'GBP';

export const MODAL_DATA = {
    general: {
        title: 'Dashboard Preferences',
        saveButton: 'Save Changes',
        themeLabel: 'Theme',
        currencyLabel: 'Currency',
    },
};

export const DX_ATTRIBUTES = {
    rootName: '__SPNS__root'
}