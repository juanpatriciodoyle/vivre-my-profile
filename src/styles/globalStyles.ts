import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: content-box;
    }

    body {
        margin: 0;
        font-family: ${({theme}) => theme.font.primary};
        background-color: ${({theme}) => theme.colors.background};
        color: ${({theme}) => theme.colors.textBody};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${({theme}) => theme.colors.textHeadings};
        font-family: ${({theme}) => theme.font.primary};
    }

    h1 {
        font-size: ${({theme}) => theme.font.sizes.h1};
        font-weight: ${({theme}) => theme.font.weights.bold};
    }

    h2 {
        font-size: ${({theme}) => theme.font.sizes.h2};
        font-weight: ${({theme}) => theme.font.weights.bold};
    }

    h3 {
        font-size: ${({theme}) => theme.font.sizes.h3};
        font-weight: ${({theme}) => theme.font.weights.semiBold};
    }

    p {
        font-size: ${({theme}) => theme.font.sizes.body};
        font-weight: ${({theme}) => theme.font.weights.regular};
    }

    code {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    }
`;