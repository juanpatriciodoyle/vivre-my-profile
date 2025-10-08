export type Country = 'GB' | 'IE';
export type Theme = 'light' | 'dark';

export interface Settings {
    theme: Theme;
    country: Country;
}