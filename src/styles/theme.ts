export const baseTheme = {
    font: {
        primary: 'Inter, sans-serif',
        weights: {
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700,
        },
        sizes: {
            display: '100px',
            h1: '34px',
            h2: '26px',
            h3: '19px',
            body: '16px',
            label: '16px',
            subtext: '13px',
            button: '15px',
        },
    },
    sizing: {
        borderRadius: {
            cards: '12px',
            buttons: '6px',
        },
    },
};

const commonColors = {
    primary: '#4f9a7c',
    primaryHover: '#428168',
    primaryTint: '#e4f2ed',
    secondaryAction: '#E5F0FF',
    secondaryHover: '#C1CDDE',
    success: '#00B74A',
    warning: '#ffa503',
    error: '#d00a74',
    successTint: '#E5F8ED',
    warningTint: '#FFF6E6',
    errorTint: '#FBE5F1',
};

export interface VivreTheme {
    font: typeof baseTheme.font;
    sizing: typeof baseTheme.sizing;
    colors: {
        primary: string;
        primaryHover: string;
        primaryTint: string;
        secondaryAction: string;
        secondaryHover: string;
        background: string;
        subtleBackground: string;
        textHeadings: string;
        textBody: string;
        borders: string;
        success: string;
        warning: string;
        error: string;
        successTint: string;
        warningTint: string;
        errorTint: string;
    };
}

const light: VivreTheme = {
    ...baseTheme,
    colors: {
        ...commonColors,
        background: '#F6F6F6',
        subtleBackground: '#FFFFFF',
        textHeadings: '#1D1D1F',
        textBody: '#545454',
        borders: '#D1D1D6',
    },
};

const dark: VivreTheme = {
    ...baseTheme,
    colors: {
        ...commonColors,
        background: '#2C2C2E',
        subtleBackground: '#1D1D1F',
        textHeadings: '#F5F5F7',
        textBody: '#B9B9BE',
        borders: '#6A6A6A',
    },
};

export const themes = {
    light,
    dark,
};

export type ThemeType = VivreTheme;