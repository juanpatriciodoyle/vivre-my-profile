import styled, {css} from 'styled-components';
import React from 'react';

type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption' | 'button' | 'headerButton';

interface TextProps {
    $variant?: TextVariant;
    as?: React.ElementType;
}

export const textStyles = {
    display: css`
        font-size: ${({theme}) => theme.font.sizes.display};
        font-weight: ${({theme}) => theme.font.weights.bold};
        color: ${({theme}) => theme.colors.textHeadings};
        line-height: 1.2;
        margin: 0;
    `,
    h1: css`
        font-size: ${({theme}) => theme.font.sizes.h1};
        font-weight: ${({theme}) => theme.font.weights.bold};
        color: ${({theme}) => theme.colors.textHeadings};
        line-height: 1.2;
        margin: 0;
    `,
    h2: css`
        font-size: ${({theme}) => theme.font.sizes.h2};
        font-weight: ${({theme}) => theme.font.weights.semiBold};
        color: ${({theme}) => theme.colors.textHeadings};
        line-height: 1.3;
        margin: 0;
    `,
    h3: css`
        font-size: ${({theme}) => theme.font.sizes.h3};
        font-weight: ${({theme}) => theme.font.weights.medium};
        color: ${({theme}) => theme.colors.textHeadings};
        line-height: 1.3;
        margin: 0;
    `,
    body: css`
        font-size: ${({theme}) => theme.font.sizes.body};
        font-weight: ${({theme}) => theme.font.weights.regular};
        color: ${({theme}) => theme.colors.textBody};
        line-height: 1.5;
        margin: 0;
    `,
    label: css`
        font-size: ${({theme}) => theme.font.sizes.label};
        font-weight: ${({theme}) => theme.font.weights.semiBold};
        color: ${({theme}) => theme.colors.textBody};
        line-height: 1.5;
        margin: 0;
    `,
    caption: css`
        font-size: ${({theme}) => theme.font.sizes.subtext};
        font-weight: ${({theme}) => theme.font.weights.regular};
        color: ${({theme}) => theme.colors.textBody};
        line-height: 1.4;
        margin: 0;
    `,
    button: css`
        font-size: ${({theme}) => theme.font.sizes.button};
        font-weight: ${({theme}) => theme.font.weights.semiBold};
        color: inherit;
        line-height: 1;
        margin: 0;
    `,
    headerButton: css`
        font-size: ${({theme}) => theme.font.sizes.button};
        font-weight: ${({theme}) => theme.font.weights.semiBold};
        color: inherit;
        line-height: 1;
        margin: 0;
    `,
};

const Text = styled.p<TextProps>`
    font-family: ${({theme}) => theme.font.primary};
    ${({$variant = 'body'}) => textStyles[$variant]}
`;

export default Text;