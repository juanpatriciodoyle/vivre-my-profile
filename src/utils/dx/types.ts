export type Currency = 'EUR' | 'GBP';
export type Theme = 'light' | 'dark';

export interface Settings {
    theme: Theme;
    currency: Currency;
}