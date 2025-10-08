import {Country, Theme} from './types';

export const THEMES: { value: Theme; label: string }[] = [
    {value: 'light', label: 'Light'},
    {value: 'dark', label: 'Dark'},
];

export const COUNTRIES: { value: Country; label: string }[] = [
    {value: 'GB', label: 'United Kingdom'},
    {value: 'IE', label: 'Ireland'},
];

export const DEFAULT_THEME: Theme = 'light';
export const DEFAULT_COUNTRY: Country = 'IE';

export const MODAL_DATA = {
    general: {
        title: 'Dashboard Preferences',
        saveButton: 'Save Changes',
        themeLabel: 'Theme',
        countryLabel: 'Country',
    },
};

export const DX_ATTRIBUTES = {
    rootName: '__SPNS__root'
}