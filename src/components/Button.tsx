import styled from 'styled-components';

export const PrimaryButton = styled.button`
    box-sizing: border-box;
    padding: 12px 20px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    background-color: #4f9a7c;
    color: #ffffff;
    font-family: ${({theme}) => theme.font.primary};
    font-size: ${({theme}) => theme.font.sizes.button};
    font-weight: ${({theme}) => theme.font.weights.medium};
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #428168;
    }
`;

export const SecondaryButton = styled(PrimaryButton)`
    background-color: #FFFFFF;
    color: #4f9a7c;
    border: 1px solid ${({theme}) => theme.colors.borders};

    &:hover {
        background-color: ${({theme}) => theme.colors.primaryTint};
    }
`;